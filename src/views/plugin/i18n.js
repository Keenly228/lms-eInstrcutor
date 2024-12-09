import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
        "Most Education": "Most Education Platform",
    }
  },
  uk: {
    translation: {
      "Welcome to React": "Слава Україні",
        "Most Education": "Найбільш надійна освітня платформа"
    }
  }
};

i18n
  .use(initReactI18next).use(LanguageDetector)
  .init({
    resources,
    // lng: "uk",
    fallbackLng: "uk",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;