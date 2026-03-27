import { getRecipeById } from "@/lib/queries";
import EditRecipeForm from "@/components/EditRecipeForm";
import { notFound } from "next/navigation";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

interface EditRecipePageProps {
    params: { id: string };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">

            {/* Breadcrumb: same max-width as form */}
            <div className="max-w-3xl mx-auto w-full mt-4 px-6 lg:px-8">
                <AppBreadcrumb recipeTitle={recipe.title} />
            </div>

            {/* Form: same max-width and padding as breadcrumb */}
            <div className="py-6 sm:py-12 max-w-3xl mx-auto w-full px-6 lg:px-8">
                <EditRecipeForm recipe={recipe} />
            </div>

        </div>
    );
}