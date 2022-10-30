import axios from 'axios'

export const get = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(url)

  return data
}

export const post = async <T>(url: string, data: unknown): Promise<T> => {
  const { data: responseData } = await axios.post<T>(url, data)

  return responseData
}

export const put = async <T>(url: string, data: unknown): Promise<T> => {
  const { data: responseData } = await axios.put<T>(url, data)

  return responseData
}

export const deleteResource = async <T>(url: string): Promise<T> => {
  const { data } = await axios.delete<T>(url)

  return data
}
