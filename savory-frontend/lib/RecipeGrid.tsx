"use client";

import { useState } from "react";
import Link from "next/link";
import { getRecipeCardsPage } from "@/lib/queries";
import type { Recipe } from "@/types/recipe";

const PAGE_SIZE = 9;

interface RecipeGridProps {
    initialRecipes: Recipe[];
    initialPage: number;
    initialHasNext: boolean;
}

export default function RecipeGrid({
                                       initialRecipes,
                                       initialPage,
                                       initialHasNext,
                                   }: RecipeGridProps) {
    const [recipes, setRecipes] = useState(initialRecipes);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [hasNext, setHasNext] = useState(initialHasNext);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMoreRecipes = async () => {
        if (loadingMore || !hasNext) return;

        setLoadingMore(true);
        setError(null);

        try {
            const nextPage = await getRecipeCardsPage(
                currentPage + 1,
                PAGE_SIZE
            );

            setRecipes((previous) => [
                ...previous,
                ...nextPage.recipes,
            ]);

            setCurrentPage(nextPage.page);
            setHasNext(nextPage.hasNext);
        } catch (err) {
            console.error("Failed to load more recipes", err);
            setError("Could not load more recipes. Please try again.");
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <>
            {/* Recipe grid */}
            <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-border pt-4 sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <Link
                        key={recipe.id}
                        href={`/recipe-details/${recipe.id}`}
                    >
                        <article className="flex max-w-xl flex-col border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            {/* Image */}
                            <div className="group relative w-full overflow-hidden">
                                <img
                                    src={
                                        recipe.imageUrl ??
                                        "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={recipe.title ?? "Untitled Recipe"}
                                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="bg-card p-5 w-full">
                                <h3 className="text-lg font-semibold text-card-foreground">
                                    {recipe.title ?? "Untitled Recipe"}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {recipe.description ?? "No description"}
                                </p>

                                <div className="mt-3 text-sm text-muted-foreground flex flex-col gap-y-1">
                                    <div className="flex items-center gap-x-4 flex-wrap">
                                        <span>
                                            🕑 {(recipe.preparationTime ?? 0) +
                                            (recipe.cookingTime ?? 0)} min
                                        </span>
                                        <span>
                                            🍽️ {recipe.servings ?? 0} porties
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            📆 {recipe.createdAt
                                            ? new Date(
                                                recipe.createdAt
                                            ).toLocaleDateString("nl-NL", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "Unknown date"}
                                        </span>
                                    </div>

                                    {/* TODO: Implement recipe tags */}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* Load more */}
            {hasNext && (
                <div className="mt-8 flex flex-col items-center gap-3">
                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={loadMoreRecipes}
                        disabled={loadingMore}
                        className="rounded-md border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loadingMore
                            ? "Loading..."
                            : "Load more recipes"}
                    </button>
                </div>
            )}
        </>
    );
}
