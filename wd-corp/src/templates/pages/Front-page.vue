<template>
    <div>
        <div class="top-bnr container">
            <div class="top-bnr__wrap">
                <p class="top-bnr__ttl">
                    We are the Leading
                    <span class="top-bnr__slash">
                        <span class="typing">Web Design </span>
                    </span> and
                    <br class="hidden-sp"/>
                    <span class="top-bnr__slash top-bnr__slash--02">
                        <span class="typing">
                            Web Development
                        </span>
                    </span>
                    Company in the <span class="text-center">Philippines</span>
                </p>
                <p class="top-bnr__txt">
                    Whether you need a new website for your business or want to improve your current one, we approach every project with <br class="hidden-sp"> creativity and dedication. Our goal is to provide effective end-to-end websites and digital solutions for businesses.
                </p>
            </div>
        </div>

        <section class="top-talk">
            <div class="container">
                <div class="list-talk__wrap">
                    <p class="list-talk__ttl">Let's Talk!</p>
                    <p class="list-talk__txt">Fill out the form to request a quotation or schedule a discovery meeting with us. </p>
                    <form class="list-talk__form-wrap" @submit.prevent="handleSubmit">
                        <input class="list-talk__input" type="text" name="your-name" placeholder="Your Name" required />
                        <input class="list-talk__input" type="email" name="your-email" placeholder="Your Email" required />
                        <input class="list-talk__input"type="tel" name="your-tel" placeholder="Your Phone Number" />
                        
                        <button type="submit" class="list-talk__btn">Submit</button>
                    </form>
                </div>
            </div>
        </section>

        <section class="top-do">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl">What We Do</h2>
                    <p class="ttl-01__txt ttl-01__txt--02">Need Help with one of these? We Got You!</p>
                </div>
                <ul class="list-01">
                    <li class="list-01__item" data-aos="fade-up" data-aos-delay="50">
                        <div class="list-01__wrap">
                            <img class="list-01__img" src="~/assets/images/top/top-do_img-01.png" alt="Web Design & Development">
                            <h3 class="list-ttl">Web Design & <br>Development</h3>
                        </div>
                    </li>
                    <li class="list-01__item" data-aos="fade-up" data-aos-delay="100">
                        <div class="list-01__wrap">
                            <img class="list-01__img" src="~/assets/images/top/top-do_img-02.png" alt="Web Hosting & Maintenance">
                            <h3 class="list-ttl">Web Hosting & <br>Maintenance</h3>
                        </div>
                    </li>
                    <li class="list-01__item" data-aos="fade-up" data-aos-delay="200">
                        <div class="list-01__wrap">
                            <img class="list-01__img" src="~/assets/images/top/top-do_img-03.png" alt="CRM Solutions">
                            <h3 class="list-ttl">CRM <br>Solutions</h3>
                        </div>
                    </li>
                    <li class="list-01__item" data-aos="fade-up" data-aos-delay="300">
                        <div class="list-01__wrap">
                            <img class="list-01__img" src="~/assets/images/top/top-do_img-04.png" alt="Digital Marketing">
                            <h3 class="list-ttl">Digital<br>Marketing</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section class="top-website">
            <div class="container">
                <div class="top-website__info">
                    <img class="top-website__img" src="https://placehold.co/600x400?text=350+Websites" alt="Created 350+ Websites" data-aos="fade-right">
                    <div class="top-website__wrap" data-aos="fade-left" data-aos-delay="200">
                        <h2 class="ttl-01__ttl">Created 350+ Websites</h2>
                        <p class="txt-01 txt-01--02">With a proven track record of creating over 350 websites—and many more ongoing projects we help businesses establish a strong online presence. From small and medium enterprises to large companies, we provide end-to-end website solutions, designing and developing websites that effectively showcase products and services while ensuring a seamless user experience that drives growth and success. </p>
                        <div class="btn">
                            <a href="/portfolio" class="btn__link">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="top-choose">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl">Why Choose Us</h2>
                    <p class="ttl-01__txt">We bring together the best of both worlds to deliver exceptional digital solutions. We combine the meticulous attention to detail and quality control standards of Japanese precision with the creativity, expertise, and passion of Philippine-based engineers. This unique blend enables us to craft high-quality website production services that exceed expectations, quickly and efficiently.</p>
                </div>
                <ul class="list-02">
                    <li class="list-02__item">
                        <img src="https://placehold.co/200x200?text=Connection" alt="Connection" class="list-02__img">
                        <h3 class="list-ttl text-uppercase">Connection</h3>
                        <p class="txt-01">We'll work together from concept to launch, building a website that accurately reflects your vision and values.</p>
                    </li>
                    <li class="list-02__item">
                        <img src="https://placehold.co/200x200?text=Customer+Focus" alt="Customer Focus" class="list-02__img">
                        <h3 class="list-ttl text-uppercase">Customer Focus</h3>
                        <p class="txt-01">We are dedicated to building long-term relationships with our clients, based on trust, and communication.</p>
                    </li>
                    <li class="list-02__item">
                        <img src="https://placehold.co/200x200?text=Solutions" alt="Solutions" class="list-02__img">
                        <h3 class="list-ttl text-uppercase">Solutions</h3>
                        <p class="txt-01">Our services are designed to solve real problems. We will create smart solutions for your long term success.</p>
                    </li>
                    <li class="list-02__item">
                        <img src="https://placehold.co/200x200?text=Reliability" alt="Reliability" class="list-02__img">
                        <h3 class="list-ttl text-uppercase">Reliability</h3>
                        <p class="txt-01">We are committed to delivering reliable website and digital solutions with a team of experts you can trust. </p>
                    </li>
                </ul>
            </div>
        </section>

        <section class="top-blog bg-white01">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl">Blogs</h2>
                    <p class="ttl-01__txt">Be updated in our blogs your ultimate destination for the latest insights in web design and development. Dive into our community stories, explore innovative design trends. Stay updated with our latest company blogs.</p>
                </div>
                <ul class="list-blog">
                    <li class="list-blog__item">
                        <div class="list-blog__img img" data-aos="fade-up" data-aos-delay="100">
                            <img src="https://placehold.co/600x400?text=Blog+Post+1" alt="Blog Post 1" class="img__main">
                        </div>
                        <div class="list-blog__wrap" data-aos="fade-up" data-aos-delay="300">
                            <p class="list-ttl">Top Web Design Trends to Watch in 2025</p>
                            <a href="/blog/post-1" class="list-blog__link">
                                Read More
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </li>
                    <li class="list-blog__item">
                        <div class="list-blog__img img" data-aos="fade-up" data-aos-delay="100">
                            <img src="https://placehold.co/600x400?text=Blog+Post+2" alt="Blog Post 2" class="img__main">
                        </div>
                        <div class="list-blog__wrap" data-aos="fade-up" data-aos-delay="300">
                            <p class="list-ttl">How a Professional Website Boosts Your Business</p>
                            <a href="/blog/post-2" class="list-blog__link">
                                Read More
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </li>
                    <li class="list-blog__item">
                        <div class="list-blog__img img" data-aos="fade-up" data-aos-delay="100">
                            <img src="https://placehold.co/600x400?text=Blog+Post+3" alt="Blog Post 3" class="img__main">
                        </div>
                        <div class="list-blog__wrap" data-aos="fade-up" data-aos-delay="300">
                            <p class="list-ttl">Why CRM Solutions Matter for Growing Companies</p>
                            <a href="/blog/post-3" class="list-blog__link">
                                Read More
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </li>
                </ul>
                <div class="btn">
                    <a href="/blog" class="btn__link btn__link--center">
                        Read More
                    </a>
                </div>
            </div>
        </section>

        <section class="top-works" v-if="portfolioItems && portfolioItems.length">
            <div class="ttl-01">
                <h2 class="ttl-01__ttl">Our Works</h2>
                <p class="ttl-01__txt">Dive to some of our projects that we created.</p>
            </div>
            <div ref="topWorksSwiper" class="top-works__swiper swiper js-swiper">
                <div class="swiper-wrapper">
                    <NuxtLink
                        v-for="item in portfolioItems"
                        :key="item.id"
                        :to="item.slug ? `/portfolio/${item.slug}` : '/portfolio'"
                        class="top-works__swiper-link swiper-slide"
                    >
                        <img
                            class="top-works__swiper-img"
                            :src="item.image || 'https://placehold.co/800x500?text=No+Image'"
                            :alt="item.title"
                        >
                    </NuxtLink>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <div class="btn">
                <a href="/portfolio" class="btn__link btn__link--center">
                    View More
                </a>
            </div>
        </section>

        <section class="top-letter">
            <img src="https://placehold.co/1920x600?text=Business+Background" alt="" class="top-letter__bg-img">
            <div class="top-letter__info">
                <div class="top-letter__wrap">
                    <h2 class="top-letter__ttl">Need Help for your Business Website?</h2>
                    <p class="top-letter__txt"> Get started with us for free. <br> Start showing your business online!</p>
                    <div class="btn">
                        <a href="/contact" class="btn__link btn__link--center">
                            Get in touch with us <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { Swiper } from 'swiper'
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

export default {
    name: 'FrontPage',
    async setup() {
        const config = useRuntimeConfig();
        const { data: portfolioItems } = await useWpPortfolio({ perPage: 12 })
        return {
            wpApiBase: config.public.wpApiBase,
            wpCf7FormId: config.public.wpCf7FormId,
            portfolioItems,
        };
    },
    data() {
        return {
            submitting: false,
            worksSwiper: null,
        };
    },
    mounted() {
        this.$nextTick(() => this.initWorksSwiper())
    },
    beforeUnmount() {
        if (this.worksSwiper) {
            this.worksSwiper.destroy(true, true)
            this.worksSwiper = null
        }
    },
    methods: {
        initWorksSwiper() {
            const el = this.$refs.topWorksSwiper
            if (!el || this.worksSwiper) return
            this.worksSwiper = new Swiper(el, {
                modules: [Autoplay, EffectCoverflow, Navigation],
                loop: true,
                effect: 'coverflow',
                autoplay: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween: 80,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                navigation: {
                    nextEl: el.querySelector('.swiper-button-next'),
                    prevEl: el.querySelector('.swiper-button-prev'),
                },
            })
        },
        async handleSubmit(event) {
            if (this.submitting) return;
            const form = event.target;
            const body = new FormData(form);

            body.append('_wpcf7', this.wpCf7FormId);
            body.append('_wpcf7_unit_tag', `wpcf7-f${this.wpCf7FormId}-o1`);
            body.append('_wpcf7_version', '6.0.6');
            body.append('_wpcf7_locale', 'en_US');
            body.append('_wpcf7_container_post', '0');

            this.submitting = true;
            try {
                const url = `${this.wpApiBase}/contact-form-7/v1/contact-forms/${this.wpCf7FormId}/feedback`;
                const res = await $fetch(url, { method: 'POST', body });
                if (res.status === 'mail_sent') {
                    alert(res.message || 'Thank you! Your message has been sent.');
                    form.reset();
                } else {
                    alert(res.message || 'There was a problem sending your message.');
                }
            } catch (err) {
                alert('Network error — please try again.');
            } finally {
                this.submitting = false;
            }
        }
    }
}
</script>
