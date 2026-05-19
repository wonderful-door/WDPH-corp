<template>
    <div class="contact">
        <BlocksBanner slug="contact" />

        <section class="contact__sec">
            <div class="container">
                <div class="contact__info">
                    <div class="contact__wrap">
                        <h2 class="ttl-01__ttl">Grow your Business <br class="hidden-sp">With Us</h2>
                        <p class="contact__txt">
                            Request for a quotation or schedule a discovery meeting with us to know more about our pricing and how we can help you.
                        </p>

                        <form class="contact__form" @submit.prevent="handleSubmit">
                            <input v-model="form.name" type="text" class="contact__form-input" placeholder="Full Name" required />
                            <input v-model="form.company" type="text" class="contact__form-input" placeholder="Company Name" required />
                            <input v-model="form.tel" type="tel" class="contact__form-input" placeholder="Contact Number" required />
                            <input v-model="form.email" type="email" class="contact__form-input" placeholder="E-mail" required />
                            <textarea v-model="form.idea" class="contact__form-idea" placeholder="Let's talk about your idea" minlength="0" maxlength="200"></textarea>

                            <label class="contact__form-checkbox">
                                <input v-model="form.agree" type="checkbox" required />
                                I agree to the Terms of Service and
                                <NuxtLink to="/privacy-policy" class="contact__link">Privacy Policy</NuxtLink>.
                            </label>

                            <button type="submit" class="contact__form-btn">Submit</button>
                        </form>
                    </div>

                    <div class="contact__img img">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3073418071094!2d121.05830807589285!3d14.58155498590256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c81469a1e8c3%3A0x778cf4c0ad300f41!2sTycoon%20Center%20Bldg.!5e0!3m2!1sen!2sph!4v1745559852519!5m2!1sen!2sph"
                            class="contact__map"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const form = reactive({
    name: '',
    company: '',
    tel: '',
    email: '',
    idea: '',
    agree: false,
})

const handleSubmit = () => {
    // TODO: wire up to contact form API
}
</script>
