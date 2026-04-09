
// TODO: REPLACE ALL ANY TYPES BY ACTUAL EXPLICIT TYPES

export type Recipe = {
    id: string;
    title: string;
    description?: string;
    instructions?: string;
    imageUrl?: string;
    preparationTime?: number;
    cookingTime?: number;
    servings?: number;
    category?: Category;
    author?: string;
    ingredients?: Ingredient[];
    createdAt: string;
    updatedAt?: string;
};

export type Ingredient = {
    name: string;
    unit: string;
    quantity: number;
};

export enum Category {
    APERITIEF = "APERITIEF",
    VOORGERECHT = "VOORGERECHT",
    HOOFDGERECHT = "HOOFDGERECHT",
    NAGERECHT = "NAGERECHT",
    SNACK = "SNACK",
    ONTBIJT = "ONTBIJT",
    BAKKEN = "BAKKEN",
    SAUS = "SAUS",
    DRINKEN = "DRINKEN",
    COCKTAIL = "COCKTAIL",
    OVERIGE = "OVERIGE"
}

export type RecipeInput = {
    title: string;
    description: string;
    instructions: string;
    imageUrl: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
    category: Category;
    author: string;
    ingredients: IngredientInput[];
};

export type IngredientInput = {
    name: string;
    unit: string;
    quantity: number;
};
