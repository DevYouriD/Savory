
# Example Queries for our GraphQL implementation

---

- [Recipe](#recipe)
  - [Create Recipe](#create-recipe)
  - [Get All Recipes](#get-all-recipes)
  - [Find Recipe by ID](#find-recipe-by-id)
  - [Update Recipe](#update-recipe)
  - [Delete Recipe](#delete-recipe)

---

## Recipe

### Create Recipe
```graphql
mutation createRecipe {
    createRecipe(input: {
        title: "Chocolate Cake",
        description: "Rich and moist",
        instructions: "Mix and bake",
        imageUrl: "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
        preparationTime: 20,
        cookingTime: 30,
        servings: 8,
        category: HOOFDGERECHT
        ingredients: [
            { name: "Flour", unit: "grams", quantity: 200 },
            { name: "Sugar", unit: "grams", quantity: 150 },
            { name: "Cocoa Powder", unit: "grams", quantity: 50 }
        ]
    }) {
        id
        title
        description
        instructions
        imageUrl
        preparationTime
        cookingTime
        servings
        category
        ingredients {
            name
            unit
            quantity
        }
    }
}
```

### Get All Recipes
```graphql
query findAllRecipes {
    findAllRecipes {
        id
        title
        description
        instructions
        imageUrl
        preparationTime
        cookingTime
        servings
        category
        createdAt
        updatedAt
        ingredients {
            name
            unit
            quantity
        }
    }
}
```

### Find Recipe by ID
```graphql
query findRecipeById {
    findRecipeById(id: "69b725341c13acbbcbdea5df") {
        id
        title
        description
        instructions
        imageUrl
        preparationTime
        cookingTime
        servings
        category
        createdAt
        updatedAt
        ingredients {
            name
            unit
            quantity
        }
    }
}
```

### Update Recipe
```graphql
mutation updateRecipe {
    updateRecipe(
        id: "69b725341c13acbbcbdea5df",
        input: {
            title: "Kettie Cake",
            description: "Even richer and moister",
            instructions: "Mix, add chocolate chips, and bake",
            imageUrl: "https://sallysbakingaddiction.com/updated-chocolate-cake.jpg",
            preparationTime: 25,
            cookingTime: 35,
            servings: 10,
            category: HOOFDGERECHT
            ingredients: [
                { name: "Flour", unit: "grams", quantity: 220 },
                { name: "Sugar", unit: "grams", quantity: 160 },
                { name: "Chocolate Chips", unit: "grams", quantity: 100 }
            ]
        }
    ) {
        id
        title
        description
        instructions
        imageUrl
        preparationTime
        cookingTime
        servings
        category
        ingredients {
            name
            unit
            quantity
        }
    }
}
```

### Delete Recipe
```graphql
mutation deleteRecipe {
    deleteRecipe(id: "69b725341c13acbbcbdea5df")
}
```
