<template>
    <div class="web">
        <BlocksBanner slug="web-hosting" />

        <section class="web-sec01">
            <div class="container">
                <div class="web-sec01__info">
                    <div class="web-sec01__wrap">
                        <h2 class="ttl-01__ttl">Reliable Web Hosting & Maintenance</h2>
                        <div v-html="data?.textInfo"></div>
                    </div>
                    <div v-if="data?.image" class="web-sec01__img img">
                        <img class="img__main" :src="data.image" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="web-sec02 bg-white01">
            <div ref="iconSwiperEl" class="web-sec02__swiper js-swiper">
                <ul v-if="icons.length" class="web-sec02__list swiper-wrapper">
                    <li v-for="(icon, i) in icons" :key="i" class="web-sec02__item swiper-slide">
                        <img :src="icon" alt="" class="web-sec02__img">
                    </li>
                </ul>
            </div>
        </section>

        <section class="web-sec03">
            <div class="container">
                <div class="web-sec03__info">
                    <ul v-if="industries.length" class="list-web">
                        <li v-for="(item, i) in industries" :key="i" class="list-web__item">
                            <h3 class="list-web__ttl">{{ item.title }}</h3>
                            <p class="list-web__txt">{{ item.text }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <BlocksContact />
    </div>
</template>

<script setup lang="ts">
import { Swiper } from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const { data } = await useWpWebDesign('web-hosting')

const icons = computed(() => data.value?.icons ?? [])
const industries = computed(() => data.value?.industries ?? [])

const iconSwiperEl = ref<HTMLElement | null>(null)
let iconSwiper: Swiper | null = null

const initSwipers = () => {
    if (iconSwiperEl.value && !iconSwiper && icons.value.length) {
        iconSwiper = new Swiper(iconSwiperEl.value, {
            modules: [Autoplay],
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            speed: 4000,
            autoplay: { delay: 0, disableOnInteraction: false },
        })
    }
}

onMounted(() => nextTick(initSwipers))

onBeforeUnmount(() => {
    iconSwiper?.destroy(true, true)
    iconSwiper = null
})
</script>
