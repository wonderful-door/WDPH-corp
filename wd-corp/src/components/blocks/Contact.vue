<template>
    <section class="top-talk">
        <div class="container">
            <h2 class="ttl-01__ttl ttl-01__ttl--02">Ready to Take the Next Step for Your Business? </h2>
            <div class="list-talk__wrap">
                <p class="list-talk__ttl">Let's Talk!</p>
                <p class="list-talk__txt">Fill out the form to request a quotation or schedule a discovery meeting with us. </p>
                <form class="list-talk__form-wrap" @submit.prevent>
                    <input v-model="form.name" class="list-talk__input" type="text" name="your-name" placeholder="Your Name" required />
                    <input v-model="form.email" class="list-talk__input" type="email" name="your-email" placeholder="Your Email" required />
                    <input v-model="form.tel" class="list-talk__input" type="tel" name="your-tel" placeholder="Your Phone Number" />

                    <button type="submit" class="list-talk__btn">Submit</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const form = reactive({
    name: '',
    email: '',
    tel: '',
})
</script>
