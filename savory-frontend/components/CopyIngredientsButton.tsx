"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe";
import { useTranslation } from "@/lib/layout-translation/use-translation";

export function CopyIngredientsButton({ recipe }: { recipe: Recipe }) {
    const [showToast, setShowToast] = useState(false);
    const { t } = useTranslation();

    function isMobileDevice() {
        if (typeof window === "undefined") return false;

        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    const handleCopy = async () => {
        const text =
            recipe.ingredients
                ?.map((ing) => {
                    const qty = Number(ing.quantity) > 0 ? `${ing.quantity} ` : "";
                    return `${qty}${ing.unit ? ing.unit + " " : ""}${ing.name}`;
                })
                .join("\n") ?? "";

        try {
            await navigator.clipboard.writeText(text);

            if (!isMobileDevice()) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="relative my-4">
            <button
                onClick={handleCopy}
                className="bg-yellow-500 text-black font-medium text-center px-4 py-2 rounded hover:bg-yellow-400 transition cursor-pointer"
            >
                {t("recipeDetailed.copyIngredientsButton")}
            </button>

            {/* TOAST */}
            {showToast && (
                <div className="absolute left-0 -top-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
                    <span>✔</span>
                    <span>{t("recipeDetailed.ingriedientsCopiedToast")}</span>
                </div>
            )}
        </div>
    );
}