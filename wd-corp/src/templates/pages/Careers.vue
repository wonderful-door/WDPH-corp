<template>
    <div class="careers">
        <section class="careers-sec01 bg-white01">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl">Join Our Team</h2>
                    <p class="ttl-01__txt">
                        We're always looking for passionate people who love building great websites and digital experiences. Explore our open roles and find your place on our team.
                    </p>
                </div>
            </div>
        </section>

        <section class="careers-sec02">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl">Why Work With Us</h2>
                    <p class="ttl-01__txt">
                        A collaborative culture that blends Japanese precision with Filipino creativity. We invest in our people, our tools, and our craft.
                    </p>
                </div>
                <ul class="list-02">
                    <li v-for="benefit in benefits" :key="benefit.title" class="list-02__item">
                        <img :src="benefit.image" :alt="benefit.title" class="list-02__img">
                        <h3 class="list-ttl text-uppercase">{{ benefit.title }}</h3>
                        <p class="txt-01">{{ benefit.description }}</p>
                    </li>
                </ul>
            </div>
        </section>

        <section class="careers-sec03 bg-white01">
            <div class="container">
                <div class="ttl-01">
                    <h2 class="ttl-01__ttl">Open Positions</h2>
                    <p class="ttl-01__txt">Current openings across engineering, design, and operations.</p>
                </div>
                <ul class="list-03">
                    <li
                        v-for="(job, index) in jobs"
                        :key="job.title"
                        class="list-03__item"
                        data-aos="fade-up"
                        :data-aos-delay="100 + index * 50"
                    >
                        <div class="list-03__info">
                            <div class="list-03__wrap">
                                <h2 class="list-03__ttl">{{ job.title }}</h2>
                                <p class="list-03__txt">
                                    <strong>{{ job.type }}</strong> &middot; {{ job.location }}
                                </p>
                                <p class="list-03__txt">{{ job.description }}</p>
                                <div class="btn">
                                    <NuxtLink to="/contact" class="btn__link">
                                        Apply Now<i class="fa-solid fa-arrow-right"></i>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section class="careers-sec04">
            <div class="about-sec03__info img">
                <img src="~/assets/images/about/about_apply.jpg" alt="Join our team" class="img__main">
                <div class="about-sec03__wrap">
                    <h2 class="about-sec03__ttl">Don't See Your Role?</h2>
                    <p class="about-sec03__txt">Send us your resume — we'd love to hear from you.</p>
                    <div class="btn">
                        <NuxtLink to="/contact" class="btn__link btn__link--center">
                            Get in Touch<i class="fa-solid fa-arrow-right"></i>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const benefits = [
    {
        title: 'Growth',
        description: 'Ongoing learning opportunities, mentorship, and a clear path forward for every role.',
        image: 'https://placehold.co/200x200?text=Growth',
    },
    {
        title: 'Culture',
        description: 'A supportive, collaborative team that values creativity, honesty, and good work.',
        image: 'https://placehold.co/200x200?text=Culture',
    },
    {
        title: 'Flexibility',
        description: 'Hybrid work options and flexible schedules so you can do your best work your way.',
        image: 'https://placehold.co/200x200?text=Flexibility',
    },
    {
        title: 'Benefits',
        description: 'Competitive compensation, HMO coverage, and leave benefits that support your life.',
        image: 'https://placehold.co/200x200?text=Benefits',
    },
]

const jobs = [
    {
        title: 'Senior Web Developer',
        type: 'Full-time',
        location: 'Manila, Philippines / Hybrid',
        description: 'Build responsive, high-performance websites using modern web technologies. 3+ years experience required.',
    },
    {
        title: 'UI/UX Designer',
        type: 'Full-time',
        location: 'Manila, Philippines / Hybrid',
        description: 'Design intuitive, beautiful interfaces for client projects across industries.',
    },
    {
        title: 'WordPress Developer',
        type: 'Full-time',
        location: 'Remote',
        description: 'Develop and maintain custom WordPress themes and plugins for enterprise clients.',
    },
    {
        title: 'Digital Marketing Specialist',
        type: 'Full-time',
        location: 'Manila, Philippines',
        description: 'Lead SEO, content, and social media campaigns that drive measurable results for our clients.',
    },
    {
        title: 'Project Manager',
        type: 'Full-time',
        location: 'Manila, Philippines / Hybrid',
        description: 'Coordinate cross-functional teams and keep projects on scope, on time, and on budget.',
    },
]
</script>
