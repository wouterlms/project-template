import {
  deleteResource,
  get,
  post,
  put,
} from './http'

export { default as createAxiosInstance } from './axios'

export const http = {
  get,
  post,
  put,
  delete: deleteResource,
}
