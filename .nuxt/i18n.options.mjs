
// @ts-nocheck


export const localeCodes =  [
  "uk",
  "ru"
]

export const localeLoaders = {
  "uk": [{ key: "../locales/uk.json", load: () => import("../locales/uk.json" /* webpackChunkName: "locale_D_58_D_58_OpenServer_home_nuxt_locales_uk_json" */), cache: true }],
  "ru": [{ key: "../locales/ru.json", load: () => import("../locales/ru.json" /* webpackChunkName: "locale_D_58_D_58_OpenServer_home_nuxt_locales_ru_json" */), cache: true }]
}

export const vueI18nConfigs = [
  () => import("../i18n.config.ts?hash=bffaebcb&config=1" /* webpackChunkName: "__i18n_config_ts_bffaebcb" */)
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./i18n.config.ts",
  "locales": [
    {
      "code": "uk",
      "name": "Українська",
      "language": "uk-UA",
      "icon": "emojione:flag-for-ukraine",
      "files": [
        "D:/OpenServer/home/nuxt/locales/uk.json"
      ]
    },
    {
      "code": "ru",
      "name": "Русский",
      "language": "ru-Ru",
      "icon": "emojione:flag-for-russia",
      "isCatchallLocale": true,
      "files": [
        "D:/OpenServer/home/nuxt/locales/ru.json"
      ]
    }
  ],
  "defaultLocale": "uk",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": true,
  "langDir": "locales/",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "https://tbk1.com.ua",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "uk",
    "name": "Українська",
    "language": "uk-UA",
    "icon": "emojione:flag-for-ukraine",
    "files": [
      {
        "path": "D:/OpenServer/home/nuxt/locales/uk.json"
      }
    ]
  },
  {
    "code": "ru",
    "name": "Русский",
    "language": "ru-Ru",
    "icon": "emojione:flag-for-russia",
    "isCatchallLocale": true,
    "files": [
      {
        "path": "D:/OpenServer/home/nuxt/locales/ru.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
