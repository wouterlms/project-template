import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import type { AwsFile } from '@/types'

interface FileItem {
  id: string
  file: File
  url: string
  isLoading: boolean
  progress: number
  cancel: () => void
}

type UploadFiles = (
  filesToUpload: File[],
  options: {
    onFileUploaded?: (file: AwsFile & { internalId: string }) => void
    preprocess?: (file: File) => File | Promise<File>
    chunkSize?: number
    replaceFiles?: boolean
  }
) => Promise<void>

interface UseFileService {
  file: Ref<Nullable<FileItem>>
  files: Ref<FileItem[]>
  isUploading: Ref<boolean>
  uploadFiles: UploadFiles
}

export default (): UseFileService => {
  const files = ref<FileItem[]>([])
  const file = computed(() => files.value[0] ?? null)
  const isUploading = ref(false)

  const getFileItem = (id: string): FileItem => (
    files.value.find((item) => item.id === id) as FileItem
  )

  const uploadFile = async (file: File, id: string): Promise<AxiosResponse<AwsFile>> => {
    const { name, type } = file

    const { data } = await axios.post<{ id: string; url: string }>('/media', {
      fileName: name,
      mimeType: type,
    })

    const blob = new Blob([file])
    const xhr = new XMLHttpRequest()

    await new Promise<void>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const fileItem = getFileItem(id)
          const progress = (e.loaded / e.total) * 100

          fileItem.progress = progress
        }
      })

      xhr.addEventListener('loadend', () => {
        if (xhr.readyState === 4 && xhr.status === 200)
          resolve()
        else reject(new Error('Upload failed'))
      })

      xhr.open('PUT', data.url, true)
      xhr.setRequestHeader('Content-Type', type)
      xhr.send(blob)
    })

    const mediaSyncResponse = axios.post<AwsFile>('/media/sync', {
      file: {
        id: data.id,
      },
    })

    return await mediaSyncResponse
  }

  const uploadFiles: UploadFiles = async (
    filesToUpload: File[],
    {
      onFileUploaded,
      preprocess,
      chunkSize,
      replaceFiles,
    },
  ): Promise<void> => {
    if (replaceFiles === true)
      files.value = []

    isUploading.value = true

    const promises: Array<() => Promise<AxiosResponse<AwsFile>>> = []

    const processedFiles = await Promise.all(
      filesToUpload.map(
        async (file) => (preprocess !== undefined ? await preprocess(file) : file),
      ),
    )

    processedFiles.forEach((file) => {
      const cancelTokenSource = axios.CancelToken.source()

      const mediaItem: FileItem = {
        file,
        id: `${Math.random()}`,
        isLoading: true,
        progress: 0,
        url: URL.createObjectURL(file),
        cancel: () => {
          cancelTokenSource.cancel()
        },
      }

      files.value.push(mediaItem)
      promises.push(async () => await uploadFile(file, mediaItem.id))
    })

    for (let i = 0; i < promises.length; i += chunkSize ?? Infinity) {
      await Promise.all(promises.slice(i, i + (chunkSize ?? Infinity)).map(async (promise) => {
        const response = promise()

        void response.then(({ data }) => {
          const { size, name } = data

          const mediaItem = files.value.find(({ file }) => {
            const fileNameWithoutExtension = file.name
              .split('.')
              .slice(0, -1)
              .join('.')

            return fileNameWithoutExtension === name && file.size === size
          }) as FileItem

          mediaItem.isLoading = false

          onFileUploaded?.({
            ...data,
            internalId: mediaItem.id,
          })
        })

        return await response
      }))
    }

    isUploading.value = false
  }

  return {
    file,
    files,
    isUploading,
    uploadFiles,
  }
}
