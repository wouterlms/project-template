import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance } from 'vue'

export default (composableName: string): ComponentInternalInstance => {
  const instance = getCurrentInstance()

  if (instance == null)
    throw new Error(`${composableName} must be called from an instance`)

  return instance
}
