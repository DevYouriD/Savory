"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe";

export function CopyIngredientsButton({ recipe }: { recipe: Recipe }) {
    const [showToast, setShowToast] = useState(false);

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

            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="relative mt-6">
            <button
                onClick={handleCopy}
                className="bg-yellow-600 text-black font-medium text-center px-4 py-2 rounded hover:bg-yellow-500 transition cursor-pointer"
            >
                Copy Ingredients
            </button>

            {/* TOAST */}
            {showToast && (
                <div className="absolute left-0 -top-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
                    <span>✔</span>
                    <span>Ingredients copied</span>
                </div>
            )}
        </div>
    );
}