<template>
    <BlocksBanner slug="portfolio" post-type="portfolio" />

    <section class="single-work">
        <div class="container">
            <div v-if="post" class="single-work__wrap">
                <h1 class="single-work__ttl" v-html="post.title"></h1>

                <div v-if="post.image" class="single-work__img img">
                    <img :src="post.image" :alt="stripTags(post.title)" class="img__main">
                </div>

                <div v-if="post.content" class="single-work__content" v-html="post.content"></div>
                <div v-else-if="post.excerpt" class="single-work__content" v-html="post.excerpt"></div>

                <div class="btn">
                    <NuxtLink to="/portfolio" class="btn__link btn__link--center">
                        <i class="fa-solid fa-arrow-left"></i> Back to Portfolio
                    </NuxtLink>
                </div>
            </div>

            <div v-else class="single-work__empty">
                <p class="text-center">Portfolio item not found.</p>
                <div class="btn">
                    <NuxtLink to="/portfolio" class="btn__link btn__link--center">
                        Back to Portfolio
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
    const raw = route.params.slug
    return Array.isArray(raw) ? raw[0] : (raw ?? '')
})

const { data: post, error } = await useWpPortfolioPost(slug)

if (error.value) {
    console.error('[PortfolioSingle] WP fetch failed:', error.value)
}

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Portfolio item not found' })
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, '')
</script>
