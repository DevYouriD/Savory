package org.example.savory.api.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.savory.api.model.dto.RecipeDto;
import org.example.savory.api.model.entity.Recipe;
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

    // CREATE

    @MutationMapping
    public Recipe createRecipe(@Argument("input") RecipeDto input) {
        return recipeService.createRecipe(input);
    }

    // READ

    @QueryMapping
    public Recipe findRecipeById(@Argument String id) {
        return recipeService.findRecipeById(id);
    }

    @QueryMapping
    public List<Recipe> findAllRecipes() {
        return recipeService.findAllRecipes();
    }

    // UPDATE

    @MutationMapping
    public Recipe updateRecipe(@Argument String id, @Argument("input") RecipeDto input) {
        return recipeService.updateRecipe(id, input);
    }

    // DELETE

    @MutationMapping
    public String deleteRecipe(@Argument String id) {
        return recipeService.deleteRecipe(id);
    }
}
