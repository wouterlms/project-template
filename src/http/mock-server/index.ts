const { DEV } = import.meta.env

export const startMockServerOnDev = async (): Promise<void> => {
  if (DEV) {
    const { worker } = await import('./worker')

    await worker.start({
      onUnhandledRequest: 'bypass',
      quiet: true,
    })
  }
}
