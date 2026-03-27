import CreateRecipeForm from "@/components/CreateRecipeForm";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export default function CreateRecipePage() {
    return (
        <div className="py-6 sm:py-8 flex-1 flex flex-col">
            {/* Breadcrumb */}
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-md sm:max-w-3xl lg:max-w-4xl mt-4">
                <AppBreadcrumb recipeTitle="New Recipe" />
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl py-6 sm:py-12">
                <CreateRecipeForm />
            </div>
        </div>
    );
}