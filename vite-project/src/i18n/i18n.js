import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./idiomas/en.json"
import es from "./idiomas/es.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',

        resources:{
            en: {translation: en},
            es: {translation: es}
        },
        interpolation: {escapeValue: false},
        detection: {
            order:["localStorage", "navigator", "htmlTag", "path", "subdomain"],
            caches:["localStorage"]
        }
    });

    export default i18n;