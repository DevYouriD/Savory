"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { updateRecipe, deleteRecipe } from "@/lib/queries";
import { RecipeInput, Category } from "@/types/recipe";
import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/layout-translation/use-translation";

export type Recipe = {
    id: string;
    title: string;
    description: string;
    instructions: string;
    imageUrl: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
    author: string;
    category: Category;
    ingredients: Ingredient[];
};

export type Ingredient = {
    name: string;
    unit: string;
    quantity: number;
};

interface Props {
    recipe: Recipe;
}

export default function EditRecipeForm({ recipe }: Props) {
    const router = useRouter();
    const { t } = useTranslation();

    const fields = [
        {
            key: "preparationTime",
            labelKey: "editRecipeForm.prepTime",
        },
        {
            key: "cookingTime",
            labelKey: "editRecipeForm.cookTime",
        },
        {
            key: "servings",
            labelKey: "editRecipeForm.servings",
        },
    ] as const;

    const [form, setForm] = useState({ ...recipe });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
        const updated = [...form.ingredients];

        switch (field) {
            case "name":
                updated[index].name = value as string;
                break;
            case "unit":
                updated[index].unit = value as string;
                break;
            case "quantity":
                updated[index].quantity = Math.max(0, Number(value));
                break;
        }

        setForm((prev) => ({ ...prev, ingredients: updated }));
    };

    const addIngredient = () => {
        setForm((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: "", unit: "", quantity: 0 }],
        }));
    };

    const removeIngredient = (index: number) => {
        setForm((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const input: RecipeInput = {
                title: [form.title],
                description: [form.description],
                instructions: [form.instructions],
                imageUrl: form.imageUrl,
                preparationTime: Number(form.preparationTime),
                cookingTime: Number(form.cookingTime),
                servings: Number(form.servings),
                category: form.category,
                author: form.author,
                ingredients: form.ingredients.map((ingredient) => ({
                    name: [ingredient.name],
                    unit: ingredient.unit,
                    quantity: Number(ingredient.quantity),
                })),
            };

            const updatedRecipe = await updateRecipe(recipe.id, input);

            router.push(`/recipe-details/${updatedRecipe.id}`);

        } catch (err) {
            console.error("Failed to update recipe", err);
        }
    };

    {/* Automatically reformat textarea based on content size */}

    const instructionsRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = instructionsRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [form.instructions]);

    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = descriptionRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [form.description]);

    // Helper function to adjust height
    const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    // Resize effect for responsiveness
    useEffect(() => {
        const handleResize = () => {
            adjustTextareaHeight(descriptionRef.current);
            adjustTextareaHeight(instructionsRef.current);
        };

        window.addEventListener("resize", handleResize);

        // Run once to adjust on mount
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Delete recipe logic

    const handleDelete = async () => {
        try {
            await deleteRecipe(recipe.id);
            router.push("/");
        } catch (err) {
            console.error("Failed to delete recipe", err);
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showIngredientDeleteModal, setShowIngredientDeleteModal] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState<number | null>(null);

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-12 mx-auto p-6 pt-6 sm:pt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                {/* TITLE */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">{t("editRecipeForm.title")}</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">{t("createRecipeForm.description")}</label>
                    <textarea
                        name="description"
                        ref={descriptionRef}
                        value={form.description}
                        onChange={handleChange}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                            target.style.height = target.scrollHeight + "px";
                        }}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none overflow-hidden resize-none"
                    />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">{t("createRecipeForm.category")}</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Category }))}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        {[
                            "APERITIEF",
                            "VOORGERECHT",
                            "HOOFDGERECHT",
                            "NAGERECHT",
                            "SNACK",
                            "ONTBIJT",
                            "BAKKEN",
                            "SAUS",
                            "DRINKEN",
                            "COCKTAIL",
                            "OVERIGE",
                        ].map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* AUTHOR */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">{t("createRecipeForm.author")}</label>
                    <input
                        name="author"
                        value={form.author}
                        onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* INSTRUCTIONS */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">{t("createRecipeForm.instructions")}</label>
                    <textarea
                        name="instructions"
                        ref={instructionsRef}
                        value={form.instructions}
                        onChange={handleChange}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                            target.style.height = target.scrollHeight + "px";
                        }}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none overflow-hidden resize-none"
                    />
                </div>

                {/* IMAGE URL */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">{t("createRecipeForm.imageUrl")}</label>
                    <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* PREP-TIME / COOKING-TIME / SERVINGS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {fields.map(({ key, labelKey }) => (
                        <div key={key} className="space-y-2">
                            <label className="block font-semibold text-gray-700 dark:text-gray-200 text-center w-full">
                                {t(labelKey)}
                            </label>

                            <input
                                type="number"
                                name={key}
                                value={form[key] ?? 0}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>

                {/* INGREDIENTS */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">{t("createRecipeForm.ingredients")}</h2>

                    {/* Header labels */}
                    <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-2 mb-2 font-semibold text-gray-700 dark:text-gray-200">
                        <span className="text-center">{t("createRecipeForm.ingredientName")}</span>
                        <span className="text-center">{t("createRecipeForm.ingredientUnit")}</span>
                        <span className="text-center">{t("createRecipeForm.ingredientQuantity")}</span>
                        <span className="w-8"></span>
                    </div>

                    {/* Ingredient inputs */}
                    {form.ingredients.map((ingredient, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-2 mb-3 items-center"
                        >
                            {/* Name - Changed text-left to sm:text-center */}
                            <input
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-center text-left"
                            />

                            {/* Unit */}
                            <input
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-center text-left"
                            />

                            {/* Quantity */}
                            <input
                                type="number"
                                step="any"
                                min={0}
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-center text-left"
                            />

                            {/* Delete button */}
                            <button
                                type="button"
                                onClick={() => {setIngredientToDelete(i); setShowIngredientDeleteModal(true);}}
                                className="
                                    text-red-500 font-bold text-lg rounded hover:bg-red-100 dark:hover:bg-red-900/30
                                    cursor-pointer w-8 h-8 flex items-center justify-center
                                    mx-auto sm:mx-0
                                    sm:justify-self-center
                                "
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addIngredient}
                            className="text-blue-500 cursor-pointer text-sm mt-2">
                        {t("editRecipeForm.addIngredientButton")}
                    </button>
                </div>

                <button type="submit" className="bg-green-800 cursor-pointer text-white px-6 py-3 rounded hover:opacity-90 mt-4 w-full">{t("editRecipeForm.saveChangesButton")}</button>

                <button type="button" onClick={() => setShowDeleteModal(true)} className="bg-red-600 cursor-pointer text-white px-6 py-3 rounded hover:opacity-90 mt-2 w-full">{t("editRecipeForm.deleteRecipeButton")}</button>
            </form>

            {/* Confirm delete ingredient popup */}
            {showIngredientDeleteModal && ingredientToDelete !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full">

                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {t("editRecipeForm.deleteIngredientModalTitle")}
                        </h3>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {t("editRecipeForm.deleteIngredientModalSubtitle")}
                        </p>

                        <div className="mt-4 flex justify-end gap-3">

                            <button
                                onClick={() => {
                                    setShowIngredientDeleteModal(false);
                                    setIngredientToDelete(null);
                                }}
                                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80"
                            >
                                {t("editRecipeForm.deleteIngredientModalCancel")}
                            </button>

                            <button
                                onClick={() => {
                                    if (ingredientToDelete !== null) {
                                        removeIngredient(ingredientToDelete);
                                    }
                                    setShowIngredientDeleteModal(false);
                                    setIngredientToDelete(null);
                                }}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:opacity-90"
                            >
                                {t("editRecipeForm.deleteIngredientModalConfirm")}
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* Confirm delete recipe popup */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {t("editRecipeForm.deleteRecipeModalTitle")}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {t("editRecipeForm.deleteRecipeModalSubtitle")}
                        </p>

                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80"
                            >
                                {t("editRecipeForm.deleteRecipeModalCancel")}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:opacity-90"
                            >
                                {t("editRecipeForm.deleteRecipeModalConfirm")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}