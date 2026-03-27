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

            {/* Breadcrumb */}
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-md sm:max-w-3xl lg:max-w-4xl mt-4">
                <AppBreadcrumb recipeTitle={recipe.title} />
            </div>

            {/* Form */}
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-md sm:max-w-3xl lg:max-w-4xl py-6 sm:py-12">
                <EditRecipeForm recipe={recipe} />
            </div>

        </div>
    );
}