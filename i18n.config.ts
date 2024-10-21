export default defineI18nConfig(() => ({
    legacy: true,
    locale: 'uk',
    missingWarn: false,
    // missing: (locale, key) => {
    //     return key;
    // },

    // fallbackLocale: 'ru',       // Return from this local if key not found
    // fallbackWarn: false,
}))