export const useWpFetch = () => {
    const config = useRuntimeConfig()
    return $fetch.create({
        baseURL: config.public.wpApiBase,
    })
}

export interface WpBanner {
    titleJp: string
    titleEn: string
    image: string
}

const resolveImage = async (
    raw: unknown,
    wpFetch: ReturnType<typeof useWpFetch>,
): Promise<string> => {
    if (!raw) return ''
    if (typeof raw === 'string') return raw
    if (typeof raw === 'object' && raw !== null && 'url' in raw) {
        return (raw as { url?: string }).url ?? ''
    }
    if (typeof raw === 'number') {
        try {
            const media = await wpFetch<{ source_url?: string }>(`/wp/v2/media/${raw}`)
            return media?.source_url ?? ''
        } catch {
            return ''
        }
    }
    return ''
}

export interface WpPortfolioItem {
    id: number
    title: string
    slug: string
    link: string
    image: string
}

export interface WpPortfolioPost extends WpPortfolioItem {
    content: string
    excerpt: string
    date: string
    acf: Record<string, any>
}

const mapPortfolioItem = async (
    post: any,
    wpFetch: ReturnType<typeof useWpFetch>,
): Promise<WpPortfolioItem> => {
    const embeddedMedia = post?._embedded?.['wp:featuredmedia']?.[0]
    let image = embeddedMedia?.source_url ?? ''

    if (!image && post?.acf?.image) {
        image = await resolveImage(post.acf.image, wpFetch)
    }
    if (!image && post?.featured_media) {
        image = await resolveImage(post.featured_media, wpFetch)
    }

    return {
        id: post?.id,
        title: post?.title?.rendered ?? '',
        slug: post?.slug ?? '',
        link: post?.link ?? '',
        image,
    }
}
export const useWpPortfolio = (options: { perPage?: number } = {}) => {
    const wpFetch = useWpFetch()
    const perPage = options.perPage ?? 12
    const key = `portfolio:list:${perPage}`

    return useAsyncData<WpPortfolioItem[]>(key, async () => {
        const posts = await wpFetch<any[]>('/wp/v2/portfolio', {
            params: { per_page: perPage, _embed: 1 },
        }).catch(() => [])

        if (!Array.isArray(posts)) return []

        return Promise.all(posts.map((post) => mapPortfolioItem(post, wpFetch)))
    })
}

export interface WpPortfolioArchive {
    items: WpPortfolioItem[]
    totalPages: number
    total: number
}

export const useWpPortfolioArchive = (
    page: Ref<number> | (() => number),
    options: { perPage?: number } = {},
) => {
    const wpFetch = useWpFetch()
    const perPage = options.perPage ?? 18
    const pageRef = typeof page === 'function' ? computed(page) : page
    const key = computed(() => `portfolio:archive:${perPage}:${pageRef.value}`)

    return useAsyncData<WpPortfolioArchive>(
        key.value,
        async () => {
            try {
                const res = await wpFetch.raw<any[]>('/wp/v2/portfolio', {
                    params: {
                        per_page: perPage,
                        page: pageRef.value,
                        _embed: 1,
                        order: 'desc',
                        status: 'publish',
                    },
                })

                const posts = Array.isArray(res._data) ? res._data : []
                const totalPages = Number(res.headers.get('x-wp-totalpages') ?? '1') || 1
                const total = Number(res.headers.get('x-wp-total') ?? `${posts.length}`) || posts.length

                const items = await Promise.all(
                    posts.map((post) => mapPortfolioItem(post, wpFetch)),
                )

                return { items, totalPages, total }
            } catch {
                return { items: [], totalPages: 1, total: 0 }
            }
        },
        { watch: [pageRef] },
    )
}

export const useWpPortfolioPost = (slug: Ref<string> | (() => string)) => {
    const wpFetch = useWpFetch()
    const slugRef = typeof slug === 'function' ? computed(slug) : slug
    const key = computed(() => `portfolio:post:${slugRef.value}`)

    return useAsyncData<WpPortfolioPost | null>(
        key.value,
        async () => {
            if (!slugRef.value) return null
            try {
                const posts = await wpFetch<any[]>('/wp/v2/portfolio', {
                    params: { slug: slugRef.value, _embed: 1 },
                })
                const post = Array.isArray(posts) ? posts[0] : null
                if (!post) return null

                const base = await mapPortfolioItem(post, wpFetch)
                return {
                    ...base,
                    content: post?.content?.rendered ?? '',
                    excerpt: post?.excerpt?.rendered ?? '',
                    date: post?.date ?? '',
                    acf: post?.acf ?? {},
                }
            } catch {
                return null
            }
        },
        { watch: [slugRef] },
    )
}

export const useWpBanner = (options: { slug?: string; postType?: string }) => {
    const wpFetch = useWpFetch()
    const key = `banner:${options.postType ?? 'page'}:${options.slug ?? 'default'}`

    return useAsyncData<WpBanner>(key, async () => {
        if (options.postType) {
            const prefix = options.postType
            const [titleRes, imageRes] = await Promise.all([
                wpFetch<any>(`/acf/v3/options/options/${prefix}_acf_banner_title_en`).catch(() => null),
                wpFetch<any>(`/acf/v3/options/options/${prefix}_acf_banner_image`).catch(() => null),
            ])

            const titleEn = typeof titleRes === 'string'
                ? titleRes
                : titleRes?.[`${prefix}_acf_banner_title_en`] ?? ''
            const imageRaw = typeof imageRes === 'object' && imageRes !== null && `${prefix}_acf_banner_image` in imageRes
                ? imageRes[`${prefix}_acf_banner_image`]
                : imageRes

            return {
                titleJp: '',
                titleEn,
                image: await resolveImage(imageRaw, wpFetch),
            }
        }

        const pages = await wpFetch<any[]>('/wp/v2/pages', {
            params: { slug: options.slug },
        })
        const page = Array.isArray(pages) ? pages[0] : null

        return {
            titleJp: page?.title?.rendered ?? '',
            titleEn: page?.acf?.acf_banner_title_en ?? '',
            image: await resolveImage(page?.acf?.acf_banner_image, wpFetch),
        }
    })
}
