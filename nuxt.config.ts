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
            // meta: [{name: 'robots', content: 'index, follow'}],
            bodyAttrs: {class: 'body'},
        }
    },
    modules: ['@nuxt/image', '@nuxtjs/google-fonts', '@nuxt/icon', '@nuxtjs/i18n', ],
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
    },
    i18n: {
        baseUrl: 'https://yourdomain.com', // ! It necessary
        strategy: 'prefix_except_default', 
        lazy: true,
        langDir: 'locales/',
        locales: [
            {
                code: 'uk',
                name: 'Українська',
                language: 'uk-UA',
                file: 'uk.json',
                icon: 'emojione:flag-for-ukraine',
                
            },
            {
                code: 'ru',
                name: 'Русский',
                language: 'ru-Ru',
                file: 'ru.json',
                icon: 'emojione:flag-for-russia',
                isCatchallLocale: true
            }
        ],     
        defaultLocale: 'uk',        
        vueI18n: './i18n.config.ts',
        // detectBrowserLanguage: {
        //     useCookie: true,
        //     cookieKey: 'i18n_redirected',
        //     alwaysRedirect: false,
        //     fallbackLocale: 'en'
        // },
    }
})