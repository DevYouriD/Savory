export const dynamic = "force-dynamic";

import { getAllRecipes } from "@/lib/queries";
import Link from "next/link";
import { getTranslator } from "@/lib/i18n";

export default async function Home() {
    const recipes = await getAllRecipes();
    const t = getTranslator("nl");

    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Title + Subtitle */}
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="font-serif text-4xl font-semibold tracking-tight text-pretty sm:text-5xl text-foreground">
                        {t("home.title")}
                    </h2>
                    <p className="mt-1 text-lg text-muted-foreground">
                        {t("home.subtitle")}
                    </p>
                </div>

                {/* Blog grid */}
                <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-border pt-4 sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                    {recipes.map((recipe) => (
                        <Link key={recipe.id} href={`/recipe-details/${recipe.id}`}>
                            <article className="flex max-w-xl flex-col border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">

                                {/* Image */}
                                <div className="group relative w-full overflow-hidden">
                                    <img
                                        src={recipe.imageUrl ?? "https://placehold.co/600x400?text=No+Image"}
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
                                        {/* Prep time + servings on the same line */}
                                        <div className="flex items-center gap-x-4 flex-wrap">
                                            <span>🕑 {(recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0)} min</span>
                                            <span>🍽️ {recipe.servings ?? 0} porties</span>
                                        </div>

                                        {/* Custom formatted date */}
                                        <div>
                                            <span>📆 {recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString('nl-NL', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }) : "Unknown date"}</span>
                                        </div>

                                        {/* Tags Section */}
                                        {/* TODO: Implement recipe Tags */}
                                        {/* {recipe.tags?.slice(0, 2).map((tag, i) => (
                                            <span
                                              key={i}
                                              className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground"
                                            >
                                              {tag.name}
                                            </span>
                                          ))} */}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}