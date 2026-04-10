"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllRecipesForIndex } from "@/lib/queries";
import { Recipe } from "@/types/recipe"

export default function Index() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getAllRecipesForIndex();

                // Sort recipes (newest first)
                data.sort((a: Recipe, b: Recipe) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });

                setRecipes(data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('nl-NL', { day: "numeric", month: "long", year: "numeric" });
    };

    if (loading) {
        return <div className="ml-8 mt-8 text-gray-500">Loading recipes...</div>;
    }

    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Title + Subtitle */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
                        Recipe Index
                    </h2>
                    <p className="mt-1 text-lg/8 dark:text-gray-200">
                        All available recipes
                    </p>
                </div>

                {/* Recipe list */}
                <ul className="mt-6 list-disc pl-5 space-y-1 text-sm max-w-2xl lg:mx-0">
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link
                                href={`/recipe-details/${recipe.id}`}
                                className="hover:underline text-gray-800 dark:text-gray-100"
                            >
                                {recipe.title}{" "}
                                <span className="text-gray-600 dark:text-gray-400 text-xs">
                                ({formatDate(recipe.createdAt)})
                            </span>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}