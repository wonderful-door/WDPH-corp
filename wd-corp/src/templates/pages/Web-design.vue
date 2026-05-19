<template>
    <div class="web">
        <BlocksBanner slug="web-design" />

        <section class="web-sec01">
            <div class="container">
                <div class="web-sec01__info">
                    <div class="web-sec01__wrap">
                        <h2 class="ttl-01__ttl">Turn website visitors into paying customers</h2>
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
                    <h2 class="ttl-01__ttl text-center">Industries That Benefit from our <br>Customized Web Solutions</h2>
                    <ul v-if="industries.length" class="list-web">
                        <li v-for="(item, i) in industries" :key="i" class="list-web__item">
                            <h3 class="list-web__ttl">{{ item.title }}</h3>
                            <p class="list-web__txt">{{ item.text }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="web-sec04 bg-white01">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl"> Our Website Production Process </h2>
                    <p class="ttl-01__txt">Discover our structured web production process from initial consultation and concept development to final launch.<br>Every step is carefully executed to ensure a seamless and successful project delivery.</p>
                </div>
                <div class="web-sec04__info">
                    <div class="web-sec04__item">
                        <h3 class="web-sec04__bar-ttl">Stage 1</h3>
                        <div class="web-sec04__bar-wrap">
                            <div class="web-sec04__bar-progress" data-aos="progressbar" data-aos-delay="0"><span></span></div>
                            <p class="web-sec04__bar-txt">PROJECT KICK-OFF</p>
                        </div>
                        <div class="web-sec04__bar-wrap web-sec04__bar-wrap--02">
                            <div class="web-sec04__bar-progress web-sec04__bar-progress--02" data-aos="progressbar" data-aos-delay="200"><span></span></div>
                            <p class="web-sec04__bar-txt">Website Preparation</p>
                        </div>
                    </div>
                    <div class="web-sec04__item">
                        <h3 class="web-sec04__bar-ttl">Stage 2</h3>
                        <div class="web-sec04__bar-wrap web-sec04__bar-wrap--03">
                            <div class="web-sec04__bar-progress web-sec04__bar-progress--03" data-aos="progressbar" data-aos-delay="400"><span></span></div>
                            <p class="web-sec04__bar-txt">Ui/Ux Design Phase</p>
                        </div>
                        <div class="web-sec04__bar-wrap web-sec04__bar-wrap--04">
                            <div class="web-sec04__bar-progress web-sec04__bar-progress--04" data-aos="progressbar" data-aos-delay="600"><span></span></div>
                            <p class="web-sec04__bar-txt">Coding/development</p>
                        </div>
                    </div>
                    <div class="web-sec04__item">
                        <h3 class="web-sec04__bar-ttl">Stage 3</h3>
                        <div class="web-sec04__bar-wrap web-sec04__bar-wrap--05">
                            <div class="web-sec04__bar-progress web-sec04__bar-progress--05" data-aos="progressbar" data-aos-delay="800"><span></span></div>
                            <p class="web-sec04__bar-txt">Quality Check</p>
                        </div>
                        <div class="web-sec04__bar-wrap web-sec04__bar-wrap--06">
                            <div class="web-sec04__bar-progress web-sec04__bar-progress--06" data-aos="progressbar" data-aos-delay="1000"><span></span></div>
                            <p class="web-sec04__bar-txt">Website launch</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="web-sec05">
            <div class="web-sec05__info">
                <h2 class="ttl-01__ttl text-center">Explore Sample Website Designs Tailored <br> for Every Business Industry </h2>
                <div ref="projectSwiperEl" class="web-sec05__swiper js-swiper">
                    <div v-if="projects.length" class="swiper-wrapper web-sec05__swiper-wrapper">
                        <div v-for="(project, i) in projects" :key="i" class="swiper-slide web-sec05__swiper-slide">
                            <div v-if="project.image" class="web-sec05__img img">
                                <img :src="project.image" alt="" class="img__main">
                            </div>
                            <p class="web-sec05__txt">{{ project.text }}</p>
                        </div>
                    </div>
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

const { data } = await useWpWebDesign('web-design')

const icons = computed(() => data.value?.icons ?? [])
const industries = computed(() => data.value?.industries ?? [])
const projects = computed(() => data.value?.projects ?? [])

const iconSwiperEl = ref<HTMLElement | null>(null)
const projectSwiperEl = ref<HTMLElement | null>(null)
let iconSwiper: Swiper | null = null
let projectSwiper: Swiper | null = null

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
    if (projectSwiperEl.value && !projectSwiper && projects.value.length) {
        projectSwiper = new Swiper(projectSwiperEl.value, {
            modules: [Autoplay],
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            speed: 8000,
            autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: true },
        })
    }
}

onMounted(() => nextTick(initSwipers))

onBeforeUnmount(() => {
    iconSwiper?.destroy(true, true)
    projectSwiper?.destroy(true, true)
    iconSwiper = null
    projectSwiper = null
})
</script>
