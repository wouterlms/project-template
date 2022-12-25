import { ref } from 'vue'

interface Notification {
  id: number
  title: string
  message: string
  timeout?: number
  icon?: string
  accentColor?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const notifications = ref<Notification[]>([])

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const removeNotification = (notification: Notification): void => {
    notifications.value = notifications.value.filter((t) => t.id !== notification.id)
  }

  const createNotification = (notification: Omit<Notification, 'id'>): Notification => {
    const n = {
      ...notification,
      id: Date.now(),
    }

    notifications.value.push(n)

    if (n.timeout !== undefined) {
      setTimeout(() => {
        removeNotification(n)
      }, n.timeout)
    }

    return n
  }

  return {
    notifications,
    createNotification,
    removeNotification,
  }
}
