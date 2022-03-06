import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationsEN from "./locales/en/translations.json";
import { Languages } from "./Languages";

let defaultLanguage = Languages.EN;

export const resources = {
  en: {
    translation: translationsEN,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    resources,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
      format(value: any, format?: string): string {
        if (format === "uppercase") return value.toUpperCase();
        return value;
      },
    },

    react: {
      defaultTransParent: "div",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    },
  });

export default i18n;
