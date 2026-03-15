package org.example.savory.api.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class IngredientDto {
    private String name;
    private String unit;
    private Float quantity;
}
