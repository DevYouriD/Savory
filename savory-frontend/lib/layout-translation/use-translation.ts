"use client";

import { useEffect, useState } from "react";
import { getTranslator } from "@/lib/layout-translation/i18n";

function getCookie(name: string) {
    if (typeof document === "undefined") return null;

    return (
        document.cookie
            .split("; ")
            .find((row) => row.startsWith(name + "="))
            ?.split("=")[1] ?? null
    );
}

export function useTranslation() {
    const [language, setLanguage] = useState<"nl" | "en">("nl");

    useEffect(() => {
        const saved = getCookie("language") as "nl" | "en" | null;
        if (saved) setLanguage(saved);
    }, []);

    return {
        language,
        t: getTranslator(language),
    };
}