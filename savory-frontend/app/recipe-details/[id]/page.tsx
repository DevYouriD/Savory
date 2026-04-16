import { getRecipeById } from "@/lib/queries";
import Link from "next/link";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { Recipe } from "@/types/recipe";
import { CopyIngredientsButton } from "@/components/CopyIngredientsButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RecipeDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const recipe: Recipe = await getRecipeById(id);

    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">
            <div className="max-w-4xl mx-auto w-full px-6 lg:px-8 relative">

                {/* Breadcrumb */}
                <div className="w-full mt-4">
                    <AppBreadcrumb recipeTitle={recipe.title} />
                </div>

                {/* Title and edit pencil */}
                <div className="flex justify-between items-center mb-4">
                    {/* TITLE */}
                    <h1 className="text-4xl font-bold pt-6 sm:pt-12">{recipe.title}</h1>

                    {/* EDIT RECIPE */}
                    <Link href={`/recipe-details/${id}/edit`} className="text-xl hover:scale-110 transition">✏️</Link>
                </div>

                {/* IMAGE */}
                <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-80 object-cover rounded-xl mb-6"
                />

                {/* DESCRIPTION */}
                <p className="text-lg text-muted-foreground mb-6">
                    {recipe.description}
                </p>

                {/* Meta info */}
                <div className="flex gap-6 text-sm text-muted-foreground mb-8">
                    <span>⏱ {(recipe.preparationTime ?? 0) + (recipe.cookingTime ?? 0)} min</span>
                    <span>🍽 {recipe.servings ?? 0} servings</span>
                </div>

                {/* INGREDIENTS */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {recipe.ingredients?.map((ing, i) => (
                            <li key={i}>
                                {Number(ing.quantity) > 0 ? `${ing.quantity} ${ing.unit} ` : ""}
                                {ing.name}
                            </li>
                        ))}
                    </ul>

                    {recipe.ingredients?.length ? (<CopyIngredientsButton recipe={recipe} />) : null}
                </div>

                {/* INSTRUCTIONS */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        {(Array.isArray(recipe.instructions)
                                ? recipe.instructions
                                : recipe.instructions?.split('.').map(s => s.trim()).filter(Boolean)
                        )?.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

            </div>
        </div>
    );
}