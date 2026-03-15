package org.example.savory.api.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.savory.api.model.dto.IngredientForRecipeDto;
import org.example.savory.api.model.dto.RecipeDto;
import org.example.savory.api.model.entity.Ingredient;
import org.example.savory.api.model.entity.Recipe;
import org.example.savory.api.service.IngredientService;
import org.example.savory.api.service.RecipeService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@Getter @Setter
@AllArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private final IngredientService ingredientService;

    // CREATE

    @MutationMapping
    public Recipe createRecipe(@Argument("input") RecipeDto input) {
        return recipeService.save(input);
    }

    // READ

    @QueryMapping
    public Recipe findRecipeById(@Argument Long id) {
        return recipeService.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @QueryMapping
    public List<Recipe> findAllRecipes() {
        return recipeService.findAll();
    }

    // UPDATE

    @MutationMapping
    public Recipe updateRecipe(
            @Argument String id,
            @Argument String title,
            @Argument String description,
            @Argument String instructions,
            @Argument String imageUrl,
            @Argument Integer preparationTime,
            @Argument Integer cookingTime,
            @Argument Integer servings
    ) {
        return recipeService.updateRecipe(
                Long.parseLong(id),
                title,
                description,
                instructions,
                imageUrl,
                preparationTime,
                cookingTime,
                servings
        );
    }

    @MutationMapping
    public Recipe addIngredientToRecipe(@Argument Long recipeId, @Argument Long ingredientId, @Argument float quantity) {
        IngredientForRecipeDto ingredient = new IngredientForRecipeDto();
        ingredient.setIngredientId(ingredientId);
        ingredient.setQuantity(quantity);
        return recipeService.addIngredient(recipeId, ingredient);
    }

    @MutationMapping
    public void removeIngredientFromRecipe() {
        // recipeService.removeIngredientFromRecipe();
    }

    // DELETE

    @MutationMapping
    public String deleteRecipe(@Argument Long id) {
        boolean deleted = recipeService.deleteById(id);
        return deleted ? "Recipe deleted: " + id : "Recipe not found";
    }
}
