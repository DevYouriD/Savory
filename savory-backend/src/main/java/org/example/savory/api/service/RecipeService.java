package org.example.savory.api.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.savory.api.model.dto.RecipeDto;
import org.example.savory.api.model.entity.Recipe;
import org.example.savory.api.repository.RecipeRepository;
import org.example.savory.api.utility.GraphQLExceptionHandler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    // CREATE

    @Transactional
    public Recipe createRecipe(RecipeDto recipe) {
        return recipeRepository.save(
                Recipe.builder()
                        .title(recipe.getTitle())
                        .description(recipe.getDescription())
                        .instructions(recipe.getInstructions())
                        .imageUrl(recipe.getImageUrl())
                        .preparationTime(recipe.getPreparationTime())
                        .cookingTime(recipe.getCookingTime())
                        .servings(recipe.getServings())
                        .category(recipe.getCategory())
                        .author(recipe.getAuthor())
                        .createdAt(LocalDateTime.now().toString())
                        .ingredients(recipe.getIngredients())
                        .build()
        );
    }

    // READ

    public List<Recipe> findAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe findRecipeById(String id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new GraphQLExceptionHandler.RecipeNotFoundException(id));
    }

    // UPDATE

    @Transactional
    public Recipe updateRecipe(String id, RecipeDto recipe) {
        Recipe target = findRecipeById(id);
        Recipe updated = target.toBuilder()
                .title(recipe.getTitle())
                .description(recipe.getDescription())
                .instructions(recipe.getInstructions())
                .imageUrl(recipe.getImageUrl())
                .preparationTime(recipe.getPreparationTime())
                .cookingTime(recipe.getCookingTime())
                .servings(recipe.getServings())
                .category(recipe.getCategory())
                .author(recipe.getAuthor())
                .updatedAt(LocalDateTime.now().toString())
                .ingredients(recipe.getIngredients())
                .build();
        return recipeRepository.save(updated);
    }

    // DELETE

    public String deleteRecipe(String id) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);

        if (recipeOptional.isPresent()) {
            recipeRepository.deleteById(id);
            return "Recipe removed Successfully!";
        } else {
            throw new GraphQLExceptionHandler.RecipeNotFoundException(id);
        }
    }
}
