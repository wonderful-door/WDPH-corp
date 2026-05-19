<template>
    <div class="services">
        <BlocksBanner slug="services" />

        <ul v-if="services.length" class="list-01">
            <li v-for="(service, index) in services" :key="service.id" class="list-01__item">
                <a :href="`#${service.id}`" class="list-01__wrap" @click.prevent="scrollToId(service.id)">
                    <img :src="navIcons[index] ?? service.image" :alt="service.title" class="list-01__img">
                    <h3 class="list-ttl">{{ service.title }}</h3>
                </a>
            </li>
            <li v-if="digitalMarketing" class="list-01__item">
                <a :href="`#${digitalMarketing.id}`" class="list-01__wrap" @click.prevent="scrollToId(digitalMarketing.id)">
                    <img class="list-01__img" src="~/assets/images/top/top-do_img-04.png" alt="Digital Marketing">
                    <h3 class="list-ttl">{{ digitalMarketing.title }}</h3>
                </a>
            </li>
        </ul>

        <section class="services-sec01">
            <ul class="list-03">
                <li
                    v-for="(service, index) in services"
                    :id="service.id"
                    :key="service.id"
                    class="list-03__item"
                >
                    <div class="list-03__info">
                        <div
                            class="list-03__img img"
                            :data-aos="(index + 1) % 2 === 0 ? 'fade-left' : 'fade-right'"
                            data-aos-delay="100"
                        >
                            <img :src="service.image" :alt="service.title" class="img__main">
                        </div>
                        <div
                            class="list-03__wrap"
                            :data-aos="(index + 1) % 2 === 0 ? 'fade-right' : 'fade-left'"
                            data-aos-delay="200"
                        >
                            <h2 class="list-03__ttl">{{ service.title }}</h2>
                            <div class="list-03__txt" v-html="service.text"></div>
                            <div v-if="service.buttonText || index === 0 || index === 1" class="btn">
                                <NuxtLink :to="index === 0 ? '/web-design' : index === 1 ? '/web-hosting' : (service.buttonLink || '/contact')" class="btn__link">
                                    {{ service.buttonText || 'Learn more' }}<i class="fa-solid fa-arrow-right"></i>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </li>

                <li v-if="digitalMarketing" :id="digitalMarketing.id" class="list-03__item">
                    <div class="list-03__info-02">
                        <h2 class="list-03__ttl text-center">{{ digitalMarketing.title }}</h2>
                        <div class="list-03__txt2" v-html="digitalMarketing.text"></div>
                        <ul class="list-digital">
                            <li
                                v-for="item in digitalMarketing.items"
                                :key="item.title"
                                class="list-digital__item"
                            >
                                <div class="list-digital__link">
                                    <div class="list-digital__img img">
                                        <img :src="item.image" :alt="item.title" class="img__main">
                                    </div>
                                    <p class="list-digital__ttl">{{ item.title }}</p>
                                </div>
                            </li>
                        </ul>
                        <div class="btn">
                            <NuxtLink to="/contact" class="btn__link btn__link--center">
                                Get Started<i class="fa-solid fa-arrow-right"></i>
                            </NuxtLink>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="services-sec01__img img">
                <img src="~/assets/images/services/services-sec01_img.jpg" alt="Offshore Development" class="img__main">
                <div class="services-sec01__img-wrap">
                    <h3 class="services-sec01__img-ttl">Offshore Development <br class="hidden-sp">Services </h3>
                    <p class="services-sec01__img-txt">
                        We offer cost-effective and reliable development solutions tailored to your business needs. While offshore development typically requires long-term contracts, we provide flexible engagement options starting with just one developer on a monthly basis.
                        <br>
                        <br>
                        Partner with us to scale your projects efficiently without compromising on quality.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import iconWebDev from '~/assets/images/top/top-do_img-01.png'
import iconHosting from '~/assets/images/top/top-do_img-02.png'
import iconCrm from '~/assets/images/top/top-do_img-03.png'

const navIcons = [iconWebDev, iconHosting, iconCrm]

const { data } = await useWpService('services')
const services = computed(() => data.value?.services ?? [])
const digitalMarketing = computed(() => data.value?.digitalMarketing ?? null)

const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
