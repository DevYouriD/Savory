"use server";

import { graphqlRequest } from "./graphql";

// TYPES

// TODO: REPLACE ALL ANY TYPES BY ACTUAL EXPLICIT TYPES

export type IngredientInput = {
    name: string;
    unit: string;
    quantity: number;
};

export type RecipeInput = {
    title: string;
    description: string;
    instructions: string;
    imageUrl: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
    ingredients: IngredientInput[];
};

// CREATE

export async function createRecipe(input: any) {
    const mutation = `
    mutation CreateRecipe($input: RecipeInput!) {
      createRecipe(input: $input) {
        id
        title
      }
    }
  `;

    const data = await graphqlRequest<{
        createRecipe: any;
    }>(mutation, { input });

    return data.createRecipe;
}

// READ

export async function getAllRecipes() {
    const query = `
    query {
    findAllRecipes {
      id
      title
      description
      instructions
      imageUrl
      preparationTime
      cookingTime
      servings
      createdAt
      }
    }
    `;

    const data = await graphqlRequest<{
        findAllRecipes: any[];
    }>(query);

    return data.findAllRecipes;
}

export async function getRecipeById(id: string) {
    const query = `
    query GetRecipe($id: ID!) {
      findRecipeById(id: $id) {
        id
        title
        description
        instructions
        imageUrl
        preparationTime
        cookingTime
        servings
        createdAt
        updatedAt
        ingredients {
          name
          unit
          quantity
        }
      }
    }
  `;

    const data = await graphqlRequest<{
        findRecipeById: any;
    }>(query, { id });

    return data.findRecipeById;
}

// UPDATE

export async function updateRecipe(id: string, input: any) {
    const mutation = `
      mutation UpdateRecipe($id: ID!, $input: RecipeInput!) {
        updateRecipe(id: $id, input: $input) {
          id
          title
          description
          instructions
          imageUrl
          preparationTime
          cookingTime
          servings
          ingredients {
            name
            unit
            quantity
          }
        }
      }
    `;
    const data = await graphqlRequest<{ updateRecipe: any }>(mutation, { id, input });
    return data.updateRecipe;
}

// DELETE
