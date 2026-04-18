// Layout Translations

import en from "@/locales/en.json";
import nl from "@/locales/nl.json";

const translations = {
    en,
    nl,
};

export type Locale = "en" | "nl";

export function getTranslator(lang: "nl" | "en") {
    return function t(path: string) {
        const result = path
            .split(".")
            .reduce((acc: any, key) => acc?.[key], translations[lang]);

        return result ?? path;
    };
}