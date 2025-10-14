import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // Передача экземпляра i18n в react-i18next
    .use(initReactI18next)
    // Загрузка переводов по HTTP
    .use(HttpBackend)
    // Автоматическое определение языка пользователя
    .use(LanguageDetector)
    .init({
        // Язык по умолчанию
        fallbackLng: 'uk',
        debug: true,
        // Настройки для LanguageDetector
        detection: {
            // Порядок определения: localStorage -> navigator
            order: ['localStorage', 'navigator'],
            // Тип хранилища для кеширования
            caches: ['localStorage'],
            // Ключ для хранения в localStorage
            lookupLocalStorage: 'language'
        },
        interpolation: {
            escapeValue: false, // не нужно для React
        },
    });

export default i18n;
