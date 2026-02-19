    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import LanguageDetector from 'i18next-browser-languagedetector';

    import es from './translations/es.json';
    import en from './translations/en.json';
    import ca from './translations/ca.json';

    i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
        es: { translation: es },
        en: { translation: en },
        ca: { translation: ca }
        },
        fallbackLng: 'es',
        debug: false,
        interpolation: {
        escapeValue: false
        }
    });

    export default i18n;