package org.example.savory.api.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.savory.api.model.dto.IngredientDto;
import org.example.savory.api.model.entity.Ingredient;
import org.example.savory.api.service.IngredientService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@Getter @Setter
@AllArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    // CREATE

    @MutationMapping
    public Ingredient createIngredient(@Argument("input") IngredientDto input) {
        return ingredientService.save(input);
    }

    // READ

    @QueryMapping
    public Ingredient findIngredientById(@Argument Long id) {
        return ingredientService.findById(id).orElseThrow(() -> new RuntimeException("Ingredient not found"));
    }

    @QueryMapping
    public List<Ingredient> findAllIngredients() {
        return ingredientService.findAll();
    }

    // UPDATE

    @MutationMapping
    public Ingredient updateIngredient(
            @Argument Long id,
            @Argument String name,
            @Argument String unit
    ) {
        return ingredientService.updateIngredient(id, name, unit);
    }

    // DELETE

    @MutationMapping
    public String deleteIngredient(@Argument Long id) {
        boolean deleted = ingredientService.deleteById(id);
        return deleted ? "Ingredient deleted" : "Ingredient not found";
    }
}
