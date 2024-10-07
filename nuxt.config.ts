// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // runtimeConfig: {
    //     NITRO_UNIX_SOCKET: process.env.NITRO_UNIX_SOCKET
    // },
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    ssr: true,
    // app: {
    //     head: {
    //         title: 'Мой сайт',
    //         meta: [
    //             { name: 'description', content: 'Это описание моего сайта по умолчанию.' },
    //             { name: 'keywords', content: 'сайт, nuxt 3, vue' },
    //             { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //             { property: 'og:type', content: 'website' },
    //             { property: 'og:title', content: 'Мой сайт' },
    //             { property: 'og:description', content: 'Описание сайта для социальных сетей' }
    //         ]
    //     }
    // }
})
