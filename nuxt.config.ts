// import * as bootstrap from 'bootstrap';
// import { Modal } from "bootstrap";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-10-08',
    // build: {
    //     parallel: false,
    //     cache: false, // Отключение кэша для избежания конфликтов
    //     hardSource: false, // Может помочь избежать конфликтов с памятью
    // },
    vite: {
        css: {
          preprocessorOptions: {
            scss: {
                api: 'modern',
                additionalData: `@import "@/assets/styles/_variables.scss";`
            },
          },
        },
    }, 
    devtools: { enabled: false },
    ssr: true,
    css: ["bootstrap/dist/css/bootstrap.min.css", '~/assets/styles/_main.scss'],
    app: {
        head: {
            titleTemplate: '%s | Steel Master',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            bodyAttrs: {class: 'body'},
        }
    },
    modules: ['@nuxt/image', '@nuxtjs/google-fonts', '@nuxt/icon'],
    googleFonts: {
        families: {
            Montserrat: {
                wght:[300, 400, 500, 600, 900]
            }
        }
    },
    icon: {
        size: '24px', // default <Icon> size applied    
        class: 'icon', // default <Icon> class applied
        mode: 'css', // default <Icon> mode applied
        // aliases: {
        //   'nuxt': 'logos:nuxt-icon',
        // },
        // customCollections: [
        //     {
        //       prefix: 'myicons',
        //       dir: './assets/myicons'
        //     },
        // ],
    }
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
    // modules: ['bootstrap']
    // provide: {
    //     bootstrap: Modal
    // }
})