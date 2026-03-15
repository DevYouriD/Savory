package org.example.savory.api.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.example.savory.api.model.dto.IngredientForRecipeDto;
import org.example.savory.api.model.dto.RecipeDto;
import org.example.savory.api.model.entity.Ingredient;
import org.example.savory.api.model.entity.Recipe;
import org.example.savory.api.repository.IngredientRepository;
import org.example.savory.api.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecipeService {

    RecipeRepository recipeRepository;
    IngredientRepository ingredientRepository;

    // CREATE
    @Transactional
    public Recipe save(RecipeDto input) {
        Recipe recipe = new Recipe(
                null,
                input.getTitle(),
                input.getDescription(),
                input.getInstructions(),
                input.getImageUrl(),
                input.getPreparationTime(),
                input.getCookingTime(),
                input.getServings(),
                LocalDateTime.now().toString(),
                null,
                new HashSet<>()
        );

        if (input.getIngredients() != null) {
            for (IngredientForRecipeDto ingredientDto : input.getIngredients()) {
                Ingredient ingredient = ingredientRepository.findById(ingredientDto.getIngredientId())
                        .orElseThrow(() -> new RuntimeException("Ingredient not found"));
                recipe.addIngredient(ingredient, ingredientDto.getQuantity());
            }
        }

        return recipeRepository.save(recipe);
    }

    // READ
    public Optional<Recipe> findById(long id) {
        return recipeRepository.findById(id);
    }

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    // UPDATE
    @Transactional
    public Recipe updateRecipe(
            Long id,
            String title,
            String description,
            String instructions,
            String imageUrl,
            Integer preparationTime,
            Integer cookingTime,
            Integer servings
    ) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

            recipe.setTitle(title);
            recipe.setDescription(description);
            recipe.setInstructions(instructions);
            recipe.setImageUrl(imageUrl);
            recipe.setPreparationTime(preparationTime);
            recipe.setCookingTime(cookingTime);
            recipe.setServings(servings);

        recipe.setUpdatedAt(LocalDateTime.now().toString());

        return recipeRepository.save(recipe);
    }

    public Recipe addIngredient(Long recipeId, IngredientForRecipeDto ingredientDto) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
        Ingredient ingredient = ingredientRepository.findById(ingredientDto.getIngredientId())
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        recipe.addIngredient(ingredient, ingredientDto.getQuantity());
        return recipeRepository.save(recipe);
    }

    // DELETE
    public boolean deleteById(long id) {
        Optional<Recipe> recipe = findById(id);

        if (recipe.isPresent()) {
            recipeRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
