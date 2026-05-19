import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
    const init = () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-quart',
            once: true,
        })
    }

    nuxtApp.hook('app:mounted', init)
    nuxtApp.hook('page:finish', () => {
        nextTick(() => AOS.refreshHard())
    })
})
