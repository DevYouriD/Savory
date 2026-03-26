"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { updateRecipe, RecipeInput } from "@/lib/queries";

export type Recipe = {
    id: string;
    title: string;
    description: string;
    instructions: string;
    imageUrl: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
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

        try {
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

            const updatedRecipe = await updateRecipe(recipe.id, input);

            router.push(`/recipe-details/${updatedRecipe.id}`);

        } catch (err) {
            console.error("Failed to update recipe", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-3 rounded" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-3 rounded" />
            <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Instructions" className="w-full border p-3 rounded h-32" />
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border p-3 rounded" />

            <div className="grid grid-cols-3 gap-4">
                <input type="number" name="preparationTime" value={form.preparationTime} onChange={handleChange} placeholder="Prep time" className="border p-3 rounded" />
                <input type="number" name="cookingTime" value={form.cookingTime} onChange={handleChange} placeholder="Cook time" className="border p-3 rounded" />
                <input type="number" name="servings" value={form.servings} onChange={handleChange} placeholder="Servings" className="border p-3 rounded" />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                {form.ingredients.map((ing, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input value={ing.name} onChange={(e) => handleIngredientChange(i, "name", e.target.value)} placeholder="Name" className="border p-2 rounded w-full" />
                        <input value={ing.unit} onChange={(e) => handleIngredientChange(i, "unit", e.target.value)} placeholder="Unit" className="border p-2 rounded w-24" />
                        <input type="number" value={ing.quantity} onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)} placeholder="Qty" className="border p-2 rounded w-24" />
                        <button type="button" onClick={() => removeIngredient(i)} className="text-red-500">✕</button>
                    </div>
                ))}
                <button type="button" onClick={addIngredient} className="text-blue-500 text-sm">+ Add Ingredient</button>
            </div>

            <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:opacity-90">Save Changes</button>
        </form>
    );
}