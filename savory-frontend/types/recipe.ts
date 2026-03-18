export type Recipe = {
    id: string;
    title: string;
    description: string;
    instructions: string;
    imageUrl: string;
    ingredients: Ingredient[];
};

export type Ingredient = {
    name: string;
    unit: string;
    quantity: number;
};
