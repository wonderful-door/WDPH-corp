<template>
    <div class="services">
        <ul class="list-01">
            <li v-for="service in services" :key="service.title" class="list-01__item">
                <div class="list-01__wrap">
                    <img :src="service.icon" :alt="service.title" class="list-01__img">
                    <h3 class="list-ttl" v-html="service.navTitle"></h3>
                </div>
            </li>
            <li class="list-01__item">
                <NuxtLink class="list-01__wrap" to="/">
                    <img class="list-01__img" src="~/assets/images/top/top-do_img-04.png" alt="Digital Marketing">
                    <h3 class="list-ttl">Digital<br>Marketing</h3>
                </NuxtLink>
            </li>
        </ul>

        <section class="services-sec01">
            <ul class="list-03">
                <li
                    v-for="(service, index) in services"
                    :key="service.title"
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
                            <p class="list-03__txt">{{ service.text }}</p>
                            <div class="btn">
                                <NuxtLink :to="service.buttonLink" class="btn__link">
                                    {{ service.buttonText }}<i class="fa-solid fa-arrow-right"></i>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </li>

                <li class="list-03__item">
                    <div class="list-03__info-02">
                        <h2 class="list-03__ttl text-center">{{ digitalMarketing.title }}</h2>
                        <p class="list-03__txt2">{{ digitalMarketing.text }}</p>
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
const services = [
    {
        navTitle: 'Web Design &<br>Development',
        title: 'Web Design & Development',
        text: 'We create modern, responsive websites that effectively showcase your products and services while providing a seamless user experience that drives growth.',
        icon: 'https://placehold.co/150x150?text=Web+Design',
        image: 'https://placehold.co/600x400?text=Web+Design+%26+Dev',
        buttonText: 'Learn More',
        buttonLink: '/contact',
    },
    {
        navTitle: 'Web Hosting &<br>Maintenance',
        title: 'Web Hosting & Maintenance',
        text: 'Reliable hosting and ongoing maintenance to keep your website fast, secure, and up to date — so you can focus on running your business.',
        icon: 'https://placehold.co/150x150?text=Hosting',
        image: 'https://placehold.co/600x400?text=Hosting+%26+Maintenance',
        buttonText: 'Learn More',
        buttonLink: '/contact',
    },
    {
        navTitle: 'CRM<br>Solutions',
        title: 'CRM Solutions',
        text: 'Custom CRM solutions designed to help you manage customer relationships, streamline processes, and grow your business.',
        icon: 'https://placehold.co/150x150?text=CRM',
        image: 'https://placehold.co/600x400?text=CRM+Solutions',
        buttonText: 'Learn More',
        buttonLink: '/contact',
    },
]

const digitalMarketing = {
    title: 'Digital Marketing',
    text: 'Boost your online presence with our end-to-end digital marketing services tailored to your business goals.',
    items: [
        { title: 'SEO', image: 'https://placehold.co/200x200?text=SEO' },
        { title: 'Social Media', image: 'https://placehold.co/200x200?text=Social+Media' },
        { title: 'Content Marketing', image: 'https://placehold.co/200x200?text=Content' },
        { title: 'Paid Ads', image: 'https://placehold.co/200x200?text=Paid+Ads' },
    ],
}
</script>
