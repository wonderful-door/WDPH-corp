<template>
    <BlocksBanner post-type="blog" />

    <section class="blog">
        <h2 class="ttl-01__ttl text-center">Our Blogs</h2>
        <div class="container">
            <ul v-if="items.length" class="list-04">
                <li
                    v-for="(item, index) in items"
                    :key="item.id"
                    class="list-04__item"
                    data-aos="fade-up"
                    :data-aos-delay="(index + 1) * 50"
                >
                    <NuxtLink :to="item.slug ? `/blog/${item.slug}` : '/blog'" class="list-04__link">
                        <div class="list-04__img img">
                            <img v-if="item.image" :src="item.image" :alt="item.title" class="img__main">
                        </div>
                        <div class="list-04__wrap">
                            <h3 class="list-04__ttl" v-html="item.title"></h3>
                            <div class="list-04__txt">
                                <p class="list-04__txt-p">{{ stripTags(item.content) }}</p>
                            </div>
                            <div class="list-04__btn">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </NuxtLink>
                </li>
            </ul>

            <p v-else class="text-center">No blog posts found.</p>

            <div v-if="totalPages > 1" class="pagination">
                <NuxtLink
                    v-if="currentPage > 1"
                    :to="pageHref(currentPage - 1)"
                    class="pagination__link pagination__link--prev"
                >
                    &laquo;
                </NuxtLink>

                <NuxtLink
                    v-for="p in pageNumbers"
                    :key="p"
                    :to="pageHref(p)"
                    class="pagination__link"
                    :class="{ 'is-active': p === currentPage }"
                >
                    {{ p }}
                </NuxtLink>

                <NuxtLink
                    v-if="currentPage < totalPages"
                    :to="pageHref(currentPage + 1)"
                    class="pagination__link pagination__link--next"
                >
                    &raquo;
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute()

const currentPage = computed(() => {
    const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
    const n = Number.parseInt(raw ?? '1', 10)
    return Number.isFinite(n) && n > 0 ? n : 1
})

const { data, error } = await useWpBlogArchive(currentPage, { perPage: 9 })

if (error.value) {
    console.error('[Blog] WP fetch failed:', error.value)
}

const items = computed(() => data.value?.items ?? [])
const totalPages = computed(() => data.value?.totalPages ?? 1)

const pageNumbers = computed(() =>
    Array.from({ length: totalPages.value }, (_, i) => i + 1),
)

const pageHref = (p: number) => (p <= 1 ? '/blog' : `/blog?page=${p}`)

const stripTags = (html: string) => html.replace(/<[^>]*>/g, '')
</script>
