package org.example.savory.api.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class RecipeDto {
    private String title;
    private String description;
    private String instructions;
    private String imageUrl;
    private int preparationTime;
    private int cookingTime;
    private int servings;
    private String createdAt;
    private String updatedAt;
    private List<IngredientForRecipeDto> ingredients;
}
