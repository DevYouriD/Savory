"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createRecipe } from "@/lib/queries";
import { Recipe, RecipeInput, Ingredient, Category } from "@/types/recipe";

export default function CreateRecipeForm() {
    const router = useRouter();

    const emptyRecipe: Omit<Recipe, "createdAt" | "updatedAt"> = {
        id: "",
        title: "",
        description: "",
        instructions: "",
        imageUrl: "",
        preparationTime: 0,
        cookingTime: 0,
        servings: 4,
        category: Category.OVERIGE,
        author: "Rudi",
        ingredients: [{name: "", unit: "", quantity: 0}],
    };

    const [form, setForm] = useState({...emptyRecipe});
    const [showIngredientDeleteModal, setShowIngredientDeleteModal] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState<number | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
        const updated = [...form.ingredients!];

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

        setForm((prev) => ({...prev, ingredients: updated}));
    };

    const addIngredient = () => {
        setForm((prev) => ({
            ...prev,
            ingredients: [...(prev.ingredients || []), {name: "", unit: "", quantity: 0}],
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

        const input: RecipeInput = {
            title: [form.title ?? ""],
            description: [form.description ?? ""],
            instructions: [form.instructions ?? ""],
            imageUrl: form.imageUrl?.trim() || "https://placehold.co/600x400?text=No+Image",
            preparationTime: Number(form.preparationTime),
            cookingTime: Number(form.cookingTime),
            servings: Number(form.servings),
            category: form.category ?? Category.OVERIGE,
            author: form.author ?? "",
            ingredients: (form.ingredients || []).map((ingredient) => ({
                name: [ingredient.name ?? ""],
                unit: ingredient.unit,
                quantity: Number(ingredient.quantity),
            })),
        };

        try {
            const created = await createRecipe(input);
            router.push(`/recipe-details/${created.id}`);
        } catch (err) {
            console.error("Failed to create recipe", err);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-12 mx-auto p-6 pt-6 sm:pt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
                {/* TITLE */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                    />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
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
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Author</label>
                    <input
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* INSTRUCTIONS */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Instructions</label>
                    <textarea
                        name="instructions"
                        value={form.instructions}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                    />
                </div>

                {/* IMAGE URL */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Image URL</label>
                    <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* PREP-TIME / COOKING-TIME / SERVINGS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["Prep Time (min)", "Cook Time (min)", "Servings"].map((label, idx) => {
                        const keys = ["preparationTime", "cookingTime", "servings"] as const;
                        const name: keyof typeof form = keys[idx];

                        return (
                            <div key={name} className="space-y-2">
                                <label
                                    className="block font-semibold text-gray-700 dark:text-gray-200 text-center w-full">
                                    {label}
                                </label>
                                <input
                                    type="number"
                                    name={name}
                                    value={form[name] ?? 0}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* INGREDIENTS */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                        Ingredients
                    </h2>

                    {/* Header labels */}
                    <div
                        className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-2 mb-2 font-semibold text-gray-700 dark:text-gray-200"
                    >
                        <span className="text-center">Name</span>
                        <span className="text-center">Unit</span>
                        <span className="text-center">Quantity</span>
                        <span className="w-8"></span>
                    </div>

                    {(form.ingredients || []).map((ingredient, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-2 mb-3 items-center justify-items-stretch"
                        >
                            {/* Name */}
                            <input
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg text-left"
                                placeholder="Name"
                            />

                            {/* Unit */}
                            <input
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg sm:text-center text-left"
                                placeholder="Unit"
                            />

                            {/* Quantity */}
                            <input
                                type="number"
                                min={0}
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg sm:text-center text-left"
                                placeholder="Qty"
                            />

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={() => {
                                    setIngredientToDelete(i);
                                    setShowIngredientDeleteModal(true);
                                }}
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
                        + Add Ingredient
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-green-800 cursor-pointer text-white px-6 py-3 rounded hover:opacity-90 mt-4 w-full"
                >
                    Create Recipe
                </button>
            </form>

            {/* Confirm delete ingredient popup */}
            {showIngredientDeleteModal && ingredientToDelete !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full">

                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Remove Ingredient
                        </h3>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to remove this ingredient?
                        </p>

                        <div className="mt-4 flex justify-end gap-3">

                            <button
                                onClick={() => {
                                    setShowIngredientDeleteModal(false);
                                    setIngredientToDelete(null);
                                }}
                                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80"
                            >
                                Cancel
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
                                Delete
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}