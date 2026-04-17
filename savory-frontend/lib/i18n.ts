// Layout Translations

import en from "@/locales/en.json";
import nl from "@/locales/nl.json";

const translations = {
    en,
    nl,
};

export type Locale = "en" | "nl";

export function getTranslator(locale: Locale) {
    return (key: string) => {
        return key.split('.').reduce((obj: any, k) => obj?.[k], translations[locale]) || key;
    };
}