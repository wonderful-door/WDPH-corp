<template>
    <BlocksBanner slug="portfolio" post-type="portfolio" />

    <section class="work">
        <h2 class="ttl-01__ttl text-center"> Portfolio </h2>
        <div class="container">
            <ul v-if="items.length" class="list-work">
                <li
                    v-for="(item, index) in items"
                    :key="item.id"
                    class="list-work__item"
                    data-aos="fade-up"
                    :data-aos-delay="(index + 1) * 50"
                >
                    <NuxtLink
                        :to="item.slug ? `/portfolio/${item.slug}` : '/portfolio'"
                        class="list-work__link"
                    >
                        <div class="list-work__img img">
                            <img
                                v-if="item.image"
                                :src="item.image"
                                :alt="item.title"
                                class="img__main"
                            >
                        </div>
                        <h3 class="list-work__ttl" v-html="item.title"></h3>
                    </NuxtLink>
                </li>
            </ul>

            <p v-else class="text-center">No portfolio items found.</p>

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

const { data, error } = await useWpPortfolioArchive(currentPage, { perPage: 18 })

if (error.value) {
    console.error('[Portfolio] WP fetch failed:', error.value)
}

const items = computed(() => data.value?.items ?? [])
const totalPages = computed(() => data.value?.totalPages ?? 1)

const pageNumbers = computed(() => {
    const total = totalPages.value
    return Array.from({ length: total }, (_, i) => i + 1)
})

const pageHref = (p: number) => (p <= 1 ? '/portfolio' : `/portfolio?page=${p}`)
</script>
