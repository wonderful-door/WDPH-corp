<template>
    <div class="careers">
        <BlocksBanner slug="careers" />

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
