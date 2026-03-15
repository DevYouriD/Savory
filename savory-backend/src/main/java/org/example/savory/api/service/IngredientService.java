package org.example.savory.api.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.example.savory.api.model.dto.IngredientDto;
import org.example.savory.api.model.entity.Ingredient;
import org.example.savory.api.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    // CREATE

    @Transactional
    public Ingredient save(IngredientDto input) {
        Ingredient ingredient = new Ingredient(input.getName(), input.getUnit());
        return ingredientRepository.save(ingredient);
    }

    // READ

    public Optional<Ingredient> findById(Long id) {
        return ingredientRepository.findById(id);
    }

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    // UPDATE

    @Transactional
    public Ingredient updateIngredient(
            Long id,
            String name,
            String unit
    ) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

            ingredient.setName(name);
            ingredient.setUnit(unit);

        return ingredientRepository.save(ingredient);
    }

    // DELETE

    public boolean deleteById(Long id) {

        Optional<Ingredient> ingredient = findById(id);

        if (ingredient.isPresent()) {
            ingredientRepository.deleteById(id);
            return true;
        }

        return false;
    }
}
