export default (): Record<string, string> => {
  const { params } = useRoute()

  return params as Record<string, string>
}

