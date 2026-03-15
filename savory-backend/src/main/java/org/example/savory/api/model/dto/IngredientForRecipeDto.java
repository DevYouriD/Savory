package org.example.savory.api.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class IngredientForRecipeDto {
    private Long ingredientId;
    private Float quantity;
}
