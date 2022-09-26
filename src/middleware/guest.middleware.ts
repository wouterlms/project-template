import { useAuth } from '@/composables'

export default async (): Promise<string | undefined> => {
  const { getUser } = useAuth()

  try {
    await getUser()
    return '/'
  }
  catch {}
}
