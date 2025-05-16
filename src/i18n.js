import es from './locales/es.json'
import en from './locales/en.json'
import {createI18n} from "vue-i18n";

/**
 * @summary Define i18n configuration
 */
const i18n = createI18n( {
    legacy: false,
    locale: 'en',
    globalInjection: true,
    messages: { en: en, es: es }
});

export default i18n;