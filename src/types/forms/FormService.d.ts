type FormService<T> = (formState: T) => {
  handleSubmit: () => Promise<void>
  handlePrepare?: () => Promise<void>
  handleDelete?: () => Promise<void>
}

export default FormService
