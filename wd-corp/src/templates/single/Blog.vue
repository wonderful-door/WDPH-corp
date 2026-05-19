<template>
    <section class="lp-blog">
        <div v-if="post" class="container">
            <h2 class="lp-blog__ttl" v-html="post.title"></h2>
            <div class="lp-blog__wrap">
                <img src="~/assets/images/common/header-logo.png" class="lp-blog__img-author" alt="">
                <p class="lp-blog__txt"> By WD Philippines</p>
                <p class="lp-blog__txt">Published on {{ formattedDate }}</p>
                <p class="lp-blog__txt"> 2 min read</p>
            </div>
            <div v-if="post.image" class="lp-blog__img img">
                <img :src="post.image" alt="" class="img__main">
            </div>
            <div class="lp-blog__info">
                <div class="lp-blog__content" v-html="post.content"></div>
                <div class="lp-blog__menu-blog menu-blog">
                    <div class="menu-blog__info">
                        <h3 class="menu-blog__ttl">Popular Posts</h3>
                        <ul v-if="popularPosts.length" class="menu-blog__list">
                            <li v-for="p in popularPosts" :key="p.id" class="menu-blog__item">
                                <NuxtLink :to="`/blog/${p.slug}`" class="menu-blog__link">
                                    <div v-if="p.image" class="menu-blog__img img">
                                        <img :src="p.image" alt="" class="img__main">
                                    </div>
                                    <div class="menu-blog__wrap">
                                        <div class="menu-blog__tag-wrap">
                                            <p v-for="t in p.tags" :key="t.slug" class="menu-blog__tag">{{ t.name }}</p>
                                        </div>
                                        <p class="menu-blog__item-ttl" v-html="p.title"></p>
                                    </div>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p class="lp-blog__social-txt">
                Good or bad, we'd love to hear your thoughts. Find us on
                <a href="https://www.facebook.com/wonderfuldoorphilippines/" class="lp-blog__social-link">(@facebook)</a>
                and
                <a href="https://www.instagram.com/wonderfuldoorph/" class="lp-blog__social-link02">(@instagram)</a>
            </p>
            <div v-if="relatedPosts.length" class="menu-blog menu-blog--02">
                <h3 class="menu-blog__ttl menu-blog__ttl--02">Here are some related articles you may find interesting:</h3>
                <ul class="menu-blog__list menu-blog__list--02">
                    <li v-for="p in relatedPosts" :key="p.id" class="menu-blog__item menu-blog__item--02">
                        <NuxtLink :to="`/blog/${p.slug}`" class="menu-blog__link menu-blog__link--02">
                            <div v-if="p.image" class="menu-blog__img menu-blog__img--02 img">
                                <img :src="p.image" alt="" class="img__main">
                            </div>
                            <div class="menu-blog__wrap menu-blog__wrap--02">
                                <div class="menu-blog__tag-wrap">
                                    <p v-for="t in p.tags" :key="t.slug" class="menu-blog__tag">{{ t.name }}</p>
                                </div>
                                <p class="menu-blog__item-ttl menu-blog__item-ttl--02" v-html="p.title"></p>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="container">
            <p class="text-center">Blog post not found.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
    const raw = route.params.slug
    return Array.isArray(raw) ? raw[0] : (raw ?? '')
})

const { data: post, error } = await useWpBlogPost(slug)

watch(error, (err) => {
    if (err) console.error('[BlogSingle] WP fetch failed:', err)
})

const tagIds = computed(() => post.value?.tagIds ?? [])
const excludeId = computed(() => post.value?.id ?? 0)

const { data: popularData } = await useWpBlogPopular(3)
const { data: relatedData } = await useWpBlogRelated(tagIds, excludeId, 3)

const popularPosts = computed(() => popularData.value ?? [])
const relatedPosts = computed(() => relatedData.value ?? [])

const formattedDate = computed(() => {
    const d = post.value?.date
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>
