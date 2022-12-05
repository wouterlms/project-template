const { DEV } = import.meta.env

export default async (): Promise<void> => {
  if (DEV) {
    const { worker } = await import('./worker')

    await worker.start({
      onUnhandledRequest: 'bypass',
      quiet: true,
    })
  }
}
