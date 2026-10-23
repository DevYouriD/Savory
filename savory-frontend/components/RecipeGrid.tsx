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
            <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 items-stretch gap-x-8 gap-y-8 border-t border-border pt-4 sm:mt-6 sm:grid-cols-2 sm:gap-y-10 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <Link
                        key={recipe.id}
                        href={`/recipe-details/${recipe.id}`}
                        className="block h-full"
                    >
                        <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border shadow-md transition-all duration-300 hover:shadow-xl">
                            {/* Image */}
                            <div className="group relative w-full overflow-hidden">
                                <img
                                    src={
                                        recipe.imageUrl ??
                                        "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={recipe.title ?? "Untitled Recipe"}
                                    loading="lazy"
                                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex min-h-0 flex-1 flex-col bg-card p-5">
                                <h3 className="line-clamp-2 text-lg font-semibold text-card-foreground">
                                    {recipe.title ?? "Untitled Recipe"}
                                </h3>

                                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                    {recipe.description?.trim() || "No description"}
                                </p>

                                <div className="mt-auto pt-3 text-sm text-muted-foreground">

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <span>
                                            🕑 {(recipe.preparationTime ?? 0) +
                                            (recipe.cookingTime ?? 0)} min
                                        </span>

                                        <span>
                                            🍽️ {recipe.servings ?? 0} porties
                                        </span>
                                    </div>

                                    <div className="mt-1">
                                        <span>
                                            📆 {recipe.createdAt
                                            ? new Date(recipe.createdAt).toLocaleDateString(
                                                "nl-NL",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )
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
                <div className="my-14 flex flex-col items-center gap-3">
                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={loadMoreRecipes}
                        disabled={loadingMore}
                        className="rounded-md border border-gray-600 px-7 py-3 text-base font-semibold text-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:border-border cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                        {loadingMore
                            ? "Loading..."
                            : "Load more recipes"}
                    </button>
                </div>
            )}
        </>
    );
}
