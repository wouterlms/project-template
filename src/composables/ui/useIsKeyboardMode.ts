import type { Ref } from 'vue'
import { ref } from 'vue'

const isKeyboardMode = ref(false)

window.addEventListener('keydown', (e) => {
  if (e.code === 'Tab')
    isKeyboardMode.value = true
})

window.addEventListener('mousedown', () => {
  isKeyboardMode.value = false
})

export default (): Ref<boolean> => isKeyboardMode
