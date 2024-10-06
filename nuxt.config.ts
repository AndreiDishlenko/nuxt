// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // runtimeConfig: {
    //     NITRO_UNIX_SOCKET: process.env.NITRO_UNIX_SOCKET
    // },
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    nitro: {
        socket: '/var/www/che6db9f89/.system/nodejs/cityposio.com.ua/socket'
    }
})
