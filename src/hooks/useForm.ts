type FormHandler = (formData?: any) => void

const useVueForm = () => {
  const handleSubmit = (formHandler: FormHandler) => {
    document.addEventListener('submit', (e: Event) => {
      e.preventDefault()
    })
    const formInputs = document.getElementsByTagName('input')
    let formData = {}
    for (let i = 0; i < formInputs.length; i++) {
      formData = { ...formData, [formInputs[i].name]: formInputs[i].value }
    }
    formHandler(formData)
  }

  return { handleSubmit }
}

export default useVueForm
