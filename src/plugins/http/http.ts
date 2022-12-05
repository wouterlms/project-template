import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const get = async <T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> => {
  const { data } = await axios.get<T>(url, config)

  return data
}

export const post = async <T>(
  url: string, data?: unknown, config?: AxiosRequestConfig<any>,
): Promise<T> => {
  const { data: responseData } = await axios.post<T>(url, data, config)

  return responseData
}

export const put = async <T>(
  url: string, data?: unknown, config?: AxiosRequestConfig<any>,
): Promise<T> => {
  const { data: responseData } = await axios.put<T>(url, data, config)

  return responseData
}

export const deleteResource = async <T>(
  url: string, config?: AxiosRequestConfig<any>,
): Promise<T> => {
  const { data } = await axios.delete<T>(url, config)

  return data
}
