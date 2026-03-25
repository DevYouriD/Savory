import { getRecipeById } from "@/lib/recipes";
import EditRecipeForm from "./EditRecipeForm";

interface EditRecipePageProps {
    params: { id: string };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
    const { id } = await params;
    const recipe = await getRecipeById(id);
    return <EditRecipeForm recipe={recipe} />;
}