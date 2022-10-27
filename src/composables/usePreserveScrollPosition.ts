import { onBeforeRouteLeave } from 'vue-router'

export default (): void => {
  const scrollPosition = ref(0)

  onActivated(() => {
    scrollTo(0, scrollPosition.value)
  })

  onBeforeRouteLeave(() => {
    scrollPosition.value = window.scrollY
  })
}
