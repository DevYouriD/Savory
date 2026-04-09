package org.example.savory.api.controller;

import org.example.savory.api.model.entity.Ingredient;
import org.example.savory.api.model.entity.Recipe;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

/**
 * This field resolver makes sure only the first entry in multi-language fields is returned.
 */
@Controller
public class RecipeFieldResolver {

    @SchemaMapping(typeName = "Recipe", field = "title")
    public String getTitle(Recipe recipe) {
        return recipe.getTitle().isEmpty() ? "" : recipe.getTitle().getFirst();
    }

    @SchemaMapping(typeName = "Recipe", field = "description")
    public String getDescription(Recipe recipe) {
        return recipe.getDescription().isEmpty() ? "" : recipe.getDescription().getFirst();
    }

    @SchemaMapping(typeName = "Recipe", field = "instructions")
    public String getInstructions(Recipe recipe) {
        return recipe.getInstructions().isEmpty() ? "" : recipe.getInstructions().getFirst();
    }

    @SchemaMapping(typeName = "Ingredient", field = "name")
    public String getIngredientName(Ingredient ingredient) {
        return ingredient.getName().isEmpty() ? "" : ingredient.getName().getFirst();
    }

}
