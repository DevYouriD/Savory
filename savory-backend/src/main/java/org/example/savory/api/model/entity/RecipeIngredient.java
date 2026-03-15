package org.example.savory.api.model.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "recipeingredients")
@Getter @Setter
@NoArgsConstructor
class RecipeIngredient {

  @EmbeddedId
  private RecipeIngredientId id = new RecipeIngredientId();

  @ManyToOne
  @MapsId("recipeId")
  @JoinColumn(name = "recipe_id")
  private Recipe recipe;

  @ManyToOne
  @MapsId("ingredientId")
  @JoinColumn(name = "ingredient_id")
  private Ingredient ingredient;

  private float quantity;

  public RecipeIngredient(Recipe recipe, Ingredient ingredient, float quantity) {
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.id = new RecipeIngredientId(recipe.getId(), ingredient.getId());
  }

}
