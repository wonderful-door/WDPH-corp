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

    return useLazyAsyncData<WpPortfolioItem[]>(key, async () => {
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

    return useLazyAsyncData<WpPortfolioArchive>(
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

    return useLazyAsyncData<WpPortfolioPost | null>(
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

const formatWysiwyg = (raw: unknown): string => {
    if (typeof raw !== 'string' || !raw.trim()) return ''
    return raw
        .trim()
        .replace(/\r\n/g, '\n')
        .split(/\n{2,}/)
        .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('')
}

const resolveLink = (raw: unknown): string => {
    if (!raw) return ''
    if (typeof raw === 'string') return raw
    if (typeof raw === 'object' && raw !== null && 'url' in raw) {
        return String((raw as { url?: unknown }).url ?? '')
    }
    return ''
}

export interface WpServiceItem {
    id: string
    title: string
    text: string
    image: string
    buttonText: string
    buttonLink: string
}

export interface WpDigitalMarketingItem {
    title: string
    image: string
}

export interface WpDigitalMarketing {
    id: string
    title: string
    text: string
    items: WpDigitalMarketingItem[]
}

export interface WpServicePage {
    services: WpServiceItem[]
    digitalMarketing: WpDigitalMarketing | null
}

export const useWpService = (slug = 'services') => {
    const wpFetch = useWpFetch()
    const key = `service:page:${slug}`

    return useLazyAsyncData<WpServicePage>(key, async () => {
        const pages = await wpFetch<any[]>('/wp/v2/pages', {
            params: { slug },
        }).catch(() => [])
        const page = Array.isArray(pages) ? pages[0] : null
        const acf = page?.acf ?? {}

        const rawServices = Array.isArray(acf.acf_service_content) ? acf.acf_service_content : []
        const services = await Promise.all(
            rawServices.map(async (row: any, index: number): Promise<WpServiceItem> => ({
                id: `service-${index + 1}`,
                title: row?.acf_service_title ?? '',
                text: formatWysiwyg(row?.acf_service_txt),
                image: await resolveImage(row?.acf_service_img, wpFetch),
                buttonText: row?.acf_service_button_text ?? '',
                buttonLink: resolveLink(row?.acf_service_button_link),
            })),
        )

        const rawDm = acf.acf_digital_marketing
        const dmRow = Array.isArray(rawDm)
            ? rawDm[0] ?? null
            : (rawDm && typeof rawDm === 'object') ? rawDm : null
        let digitalMarketing: WpDigitalMarketing | null = null
        if (dmRow) {
            const rawItems = Array.isArray(dmRow.acf_digital_marketing_digital_content)
                ? dmRow.acf_digital_marketing_digital_content
                : []
            const items = await Promise.all(
                rawItems.map(async (item: any): Promise<WpDigitalMarketingItem> => ({
                    title: item?.acf_digital_marketing_digital_title ?? '',
                    image: await resolveImage(item?.acf_digital_marketing_image, wpFetch),
                })),
            )
            digitalMarketing = {
                id: 'service-digital-marketing',
                title: dmRow.acf_digital_marketing_title ?? '',
                text: formatWysiwyg(dmRow.acf_digital_marketing_text),
                items,
            }
        }

        return { services, digitalMarketing }
    })
}

export interface WpBlogTag {
    slug: string
    name: string
}

export interface WpBlogPost {
    id: number
    title: string
    slug: string
    link: string
    image: string
    content: string
    excerpt: string
    date: string
    tags: WpBlogTag[]
    tagIds: number[]
}

const mapBlogPost = async (
    post: any,
    wpFetch: ReturnType<typeof useWpFetch>,
): Promise<WpBlogPost> => {
    const fm = post?._embedded?.['wp:featuredmedia']?.[0]
    let image = fm?.source_url ?? ''
    if (!image && post?.featured_media) {
        image = await resolveImage(post.featured_media, wpFetch)
    }

    const termGroups = post?._embedded?.['wp:term'] ?? []
    const tags: WpBlogTag[] = []
    for (const group of termGroups) {
        if (!Array.isArray(group)) continue
        for (const t of group) {
            if (t?.taxonomy === 'blog-tag') {
                tags.push({ slug: t.slug ?? '', name: t.name ?? '' })
            }
        }
    }

    return {
        id: post?.id,
        title: post?.title?.rendered ?? '',
        slug: post?.slug ?? '',
        link: post?.link ?? '',
        image,
        content: post?.content?.rendered ?? '',
        excerpt: post?.excerpt?.rendered ?? '',
        date: post?.date ?? '',
        tags,
        tagIds: Array.isArray(post?.['blog-tag']) ? post['blog-tag'] : [],
    }
}

export interface WpBlogArchive {
    items: WpBlogPost[]
    totalPages: number
    total: number
}

export const useWpBlogArchive = (
    page: Ref<number> | (() => number),
    options: { perPage?: number } = {},
) => {
    const wpFetch = useWpFetch()
    const perPage = options.perPage ?? 9
    const pageRef = typeof page === 'function' ? computed(page) : page
    const key = computed(() => `blog:archive:${perPage}:${pageRef.value}`)

    return useLazyAsyncData<WpBlogArchive>(
        key.value,
        async () => {
            try {
                const res = await wpFetch.raw<any[]>('/wp/v2/blog', {
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

                const items = await Promise.all(posts.map((p) => mapBlogPost(p, wpFetch)))
                return { items, totalPages, total }
            } catch {
                return { items: [], totalPages: 1, total: 0 }
            }
        },
        { watch: [pageRef] },
    )
}

export const useWpBlogPost = (slug: Ref<string> | (() => string)) => {
    const wpFetch = useWpFetch()
    const slugRef = typeof slug === 'function' ? computed(slug) : slug
    const key = computed(() => `blog:post:${slugRef.value}`)

    return useLazyAsyncData<WpBlogPost | null>(
        key.value,
        async () => {
            if (!slugRef.value) return null
            try {
                const posts = await wpFetch<any[]>('/wp/v2/blog', {
                    params: { slug: slugRef.value, _embed: 1 },
                })
                const post = Array.isArray(posts) ? posts[0] : null
                if (!post) return null
                return mapBlogPost(post, wpFetch)
            } catch {
                return null
            }
        },
        { watch: [slugRef] },
    )
}

export const useWpBlogPopular = (limit = 3) => {
    const wpFetch = useWpFetch()
    return useLazyAsyncData<WpBlogPost[]>(`blog:popular:${limit}`, async () => {
        const posts = await wpFetch<any[]>('/wp/v2/blog', {
            params: { per_page: limit, _embed: 1, orderby: 'date', order: 'desc' },
        }).catch(() => [])
        if (!Array.isArray(posts)) return []
        return Promise.all(posts.map((p) => mapBlogPost(p, wpFetch)))
    })
}

export const useWpBlogRelated = (
    tagIds: Ref<number[]> | (() => number[]),
    excludeId: Ref<number> | (() => number),
    limit = 3,
) => {
    const wpFetch = useWpFetch()
    const tagsRef = typeof tagIds === 'function' ? computed(tagIds) : tagIds
    const excludeRef = typeof excludeId === 'function' ? computed(excludeId) : excludeId
    const key = computed(() => `blog:related:${tagsRef.value.join(',')}:${excludeRef.value}`)

    return useLazyAsyncData<WpBlogPost[]>(
        key.value,
        async () => {
            if (!tagsRef.value.length) return []
            const posts = await wpFetch<any[]>('/wp/v2/blog', {
                params: {
                    'blog-tag': tagsRef.value.join(','),
                    per_page: limit,
                    exclude: excludeRef.value,
                    _embed: 1,
                },
            }).catch(() => [])
            if (!Array.isArray(posts)) return []
            return Promise.all(posts.map((p) => mapBlogPost(p, wpFetch)))
        },
        { watch: [tagsRef, excludeRef] },
    )
}

export interface WpWebDesignIndustry {
    title: string
    text: string
}

export interface WpWebDesignProject {
    image: string
    text: string
}

export interface WpWebDesignPage {
    textInfo: string
    image: string
    icons: string[]
    industries: WpWebDesignIndustry[]
    projects: WpWebDesignProject[]
}

const renderRichText = (raw: unknown): string => {
    if (typeof raw !== 'string' || !raw.trim()) return ''
    if (/<\s*(p|div|h[1-6]|ul|ol|br)\b/i.test(raw)) return raw
    return formatWysiwyg(raw)
}

export const useWpWebDesign = (slug = 'web-design') => {
    const wpFetch = useWpFetch()
    const key = `webdesign:page:${slug}`

    return useLazyAsyncData<WpWebDesignPage>(key, async () => {
        const pages = await wpFetch<any[]>('/wp/v2/pages', {
            params: { slug },
        }).catch(() => [])
        const page = Array.isArray(pages) ? pages[0] : null
        const acf = page?.acf ?? {}

        const rawIcons = Array.isArray(acf.acf_web_design_icon) ? acf.acf_web_design_icon : []
        const icons = await Promise.all(
            rawIcons.map((row: any) => resolveImage(row?.acf_web_design_image, wpFetch)),
        )

        const rawIndustries = Array.isArray(acf.acf_web_design_list_info) ? acf.acf_web_design_list_info : []
        const industries: WpWebDesignIndustry[] = rawIndustries.map((row: any) => ({
            title: row?.acf_web_design_list_ttl ?? '',
            text: row?.acf_web_design_list_txt ?? '',
        }))

        const rawProjects = Array.isArray(acf.acf_web_design_project) ? acf.acf_web_design_project : []
        const projects = await Promise.all(
            rawProjects.map(async (row: any): Promise<WpWebDesignProject> => ({
                image: await resolveImage(row?.acf_web_design_image, wpFetch),
                text: row?.acf_web_design_text ?? '',
            })),
        )

        return {
            textInfo: renderRichText(acf.acf_web_design_text_info),
            image: await resolveImage(acf.acf_web_design_image, wpFetch),
            icons,
            industries,
            projects,
        }
    })
}

export const useWpBanner = (options: { slug?: string; postType?: string }) => {
    const wpFetch = useWpFetch()
    const key = `banner:${options.postType ?? 'page'}:${options.slug ?? 'default'}`

    return useLazyAsyncData<WpBanner>(key, async () => {
        if (options.postType) {
            const prefix = options.postType
            const res = await wpFetch<any>(`/custom/v1/banner/${prefix}`).catch(() => ({}))

            return {
                titleJp: '',
                titleEn: res?.titleEn ?? '',
                image: await resolveImage(res?.image, wpFetch),
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


