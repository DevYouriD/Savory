"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createRecipe, RecipeInput, Recipe } from "@/lib/queries";

export default function CreateRecipeForm() {
    const router = useRouter();

    const emptyRecipe: Recipe = {
        id: "",
        title: "",
        description: "",
        instructions: "",
        imageUrl: "",
        preparationTime: 0,
        cookingTime: 0,
        servings: 1,
        ingredients: [{ name: "", unit: "", quantity: 0 }],
    };

    const [form, setForm] = useState({ ...emptyRecipe });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index: number, field: string, value: string | number) => {
        const updated = [...form.ingredients];
        updated[index][field] = field === "quantity" ? Number(value) : value;
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

        const input: RecipeInput = {
            title: form.title,
            description: form.description,
            instructions: form.instructions,
            imageUrl: form.imageUrl,
            preparationTime: Number(form.preparationTime),
            cookingTime: Number(form.cookingTime),
            servings: Number(form.servings),
            ingredients: form.ingredients.map((ing) => ({
                name: ing.name,
                unit: ing.unit,
                quantity: Number(ing.quantity),
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
        <form
            onSubmit={handleSubmit}
            className="space-y-12 mx-auto p-6 pt-6 sm:pt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md"
        >
            {/* Title */}
            <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Title</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                />
            </div>

            {/* Instructions */}
            <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Instructions</label>
                <textarea
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Image URL</label>
                <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Prep / Cook / Servings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Prep Time (min)", "Cook Time (min)", "Servings"].map((label, idx) => {
                    const name = ["preparationTime", "cookingTime", "servings"][idx];
                    return (
                        <div key={name} className="space-y-2">
                            <label className="block font-semibold text-gray-700 dark:text-gray-200 text-center w-full">{label}</label>
                            <input
                                type="number"
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Ingredients */}
            <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Ingredients</h2>

                {/* Header */}
                <div className="flex flex-wrap gap-2 mb-2 font-semibold items-center text-gray-700 dark:text-gray-200">
                    <span className="flex-1 min-w-[100px] text-center">Name</span>
                    <span className="w-24 text-center">Unit</span>
                    <span className="w-24 text-center">Quantity</span>
                    <span className="w-6"></span>
                </div>

                {form.ingredients.map((ing, i) => (
                    <div key={i} className="flex flex-wrap gap-2 mb-2 items-center">
                        <input
                            value={ing.name}
                            onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg flex-1 min-w-[100px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <input
                            value={ing.unit}
                            onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg w-24 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <input
                            type="number"
                            value={ing.quantity}
                            onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg w-24 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => removeIngredient(i)}
                            className="text-red-500 font-bold text-lg cursor-pointer flex-shrink-0"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addIngredient} className="text-blue-500 text-sm mt-2">
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
    );
}