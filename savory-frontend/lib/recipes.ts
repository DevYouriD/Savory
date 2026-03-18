import { graphqlRequest } from "./graphql";

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
      ingredients {
        name
        quantity
        unit
        }
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
        ingredients {
          name
          quantity
          unit
        }
      }
    }
  `;

    const data = await graphqlRequest<{
        findRecipeById: any;
    }>(query, { id });

    return data.findRecipeById;
}
