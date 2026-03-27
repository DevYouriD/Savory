import { getRecipeById } from "@/lib/queries";
import EditRecipeForm from "@/components/EditRecipeForm";
import { notFound } from "next/navigation";

interface EditRecipePageProps {
    params: { id: string };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    return (
        <div className="py-6 sm:py-12">
            <EditRecipeForm recipe={recipe} />
        </div>
    );
}