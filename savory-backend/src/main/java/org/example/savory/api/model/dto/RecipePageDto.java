package org.example.savory.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.example.savory.api.model.entity.Recipe;

import java.util.List;

@Getter
@AllArgsConstructor
public class RecipePageDto {
    private List<Recipe> recipes;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean hasNext;
}
