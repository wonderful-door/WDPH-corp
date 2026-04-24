<template>
    <div class="lower-banner banner img">
        <div class="banner__wrap">
            <div class="container">
                <h1 ref="titleEl" class="banner__ttl-en" data-splitting="chars" v-html="titleEn"></h1>
            </div>
        </div>

        <img v-if="image" class="img__main" :src="image" alt="" />
    </div>
</template>

<script setup lang="ts">
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

const props = defineProps<{
    slug?: string
    postType?: string
}>()

const { data, error } = await useWpBanner({
    slug: props.slug,
    postType: props.postType,
})

if (error.value) {
    console.error('[BlocksBanner] WP fetch failed:', error.value)
}

const titleEn = computed(() => data.value?.titleEn ?? '')
const image = computed(() => data.value?.image ?? '')

const titleEl = ref<HTMLElement | null>(null)

const runSplitting = async () => {
    if (!import.meta.client || !titleEl.value) return
    await nextTick()
    const { default: Splitting } = await import('splitting')
    Splitting({ target: titleEl.value, by: 'chars' })

    const chars = titleEl.value.querySelectorAll<HTMLElement>('.char')
    chars.forEach((c) => (c.style.opacity = '0'))

    let i = 0
    const typeChar = () => {
        if (i < chars.length) {
            chars[i].style.opacity = '1'
            i++
            setTimeout(typeChar, 40)
        }
    }
    typeChar()
}

onMounted(runSplitting)
watch(titleEn, runSplitting)
</script>
