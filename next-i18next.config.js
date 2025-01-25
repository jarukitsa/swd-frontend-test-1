/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th'],
  },
  localePath:"./public/locales",
  backend: {
    loadPath: "./public/locales/{{lng}}/common.json"
  }
}