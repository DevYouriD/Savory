package org.example.savory.api.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recipes")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;
  String title;
  String description;
  String instructions;
  String imageUrl;
  int preparationTime;
  int cookingTime;
  int servings;
  // List<Category> categories;
  // List<Tag> tags;
  // User author;
  // List<Comment> comments;
  // double rating;
  String createdAt;
  String updatedAt;

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

  public void addIngredient(Ingredient ingredient, float quantity) {

    for (RecipeIngredient ri : recipeIngredients) {
      if (ri.getIngredient().getId().equals(ingredient.getId())) {
        ri.setQuantity(quantity);
        return;
      }
    }

    RecipeIngredient recipeIngredient = new RecipeIngredient(this, ingredient, quantity);
    recipeIngredients.add(recipeIngredient);
    ingredient.getRecipeIngredients().add(recipeIngredient);
  }

}
