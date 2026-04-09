"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { updateRecipe, deleteRecipe } from "@/lib/queries";
import { RecipeInput, Category } from "@/types/recipe";
import { useEffect, useRef } from "react";

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
                updated[index].quantity = Number(value);
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

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-12 mx-auto p-6 pt-6 sm:pt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
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
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Category</label>
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
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Author</label>
                    <input
                        name="author"
                        value={form.author}
                        onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* INSTRUCTIONS */}
                <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">Instructions</label>
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
                                <label className="block font-semibold text-gray-700 dark:text-gray-200 text-center w-full">
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
                    <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Ingredients</h2>

                    {/* Header labels */}
                    <div className="flex flex-wrap gap-2 mb-2 font-semibold items-center text-gray-700 dark:text-gray-200">
                        <span className="flex-1 min-w-[100px] text-center">Name</span>
                        <span className="w-24 text-center">Unit</span>
                        <span className="w-24 text-center">Quantity</span>
                        <span className="w-6"></span> {/* delete button */}
                    </div>

                    {/* Ingredient inputs */}
                    {form.ingredients.map((ingredient, i) => (
                        <div key={i} className="flex flex-wrap gap-2 mb-2 items-center">
                            <input
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg flex-1 min-w-[100px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <input
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg w-24 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <input
                                type="number"
                                value={ingredient.quantity}
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

                    <button type="button" onClick={addIngredient} className="text-blue-500 text-sm mt-2">+ Add Ingredient</button>
                </div>

                <button type="submit" className="bg-green-800 cursor-pointer text-white px-6 py-3 rounded hover:opacity-90 mt-4 w-full">Save Changes</button>

                <button type="button" onClick={() => setShowDeleteModal(true)} className="bg-red-600 cursor-pointer text-white px-6 py-3 rounded hover:opacity-90 mt-2 w-full">Delete Recipe</button>
            </form>

            {/* Confirm delete recipe popup */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Delete Recipe
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to delete this recipe?
                        </p>

                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-80"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
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