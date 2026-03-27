import { getRecipeById } from "@/lib/queries";
import Link from "next/link";

export default async function RecipeDetailsPage({ params }) {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">
            <div className="max-w-4xl mx-auto px-6 py-10 relative">

                {/* EDIT RECIPE */}

                <Link
                    href={`/recipe-details/${id}/edit`}
                    className="absolute top-6 right-6 text-xl hover:scale-110 transition"
                >
                    ✏️
                </Link>

                {/* TITLE */}
                <h1 className="text-4xl font-bold mb-4">
                    {recipe.title}
                </h1>

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
                    <span>⏱ {recipe.preparationTime + recipe.cookingTime} min</span>
                    <span>🍽 {recipe.servings} servings</span>
                </div>

                {/* INGREDIENTS */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {recipe.ingredients?.map((ing, i) => (
                            <li key={i}>
                                {ing.quantity} {ing.unit} {ing.name}
                            </li>
                        ))}
                    </ul>
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