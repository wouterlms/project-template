import axios from 'axios'
import type { Ref } from 'vue'

import type { FileObject } from '@/types'

interface UseFileUpload {
  isUploadingFile: Ref<boolean>
  progress: Ref<number>
  uploadFile: (file: File) => Promise<FileObject>
}

export default (): UseFileUpload => {
  const progress = ref(0)
  const isUploadingFile = ref(false)

  const uploadFile = async (file: File): Promise<FileObject> => {
    isUploadingFile.value = true

    const formData = new FormData()

    formData.append('file', file)

    const response = axios.post<FileObject>('/media', formData, {
      onUploadProgress: ({ loaded, total }) => {
        if (total != null)
          progress.value = Math.round((loaded * 100) / total)
      },
    })

    const { data } = await response
    isUploadingFile.value = false

    return data
  }

  return {
    isUploadingFile,
    progress,
    uploadFile,
  }
}
