package org.example.savory.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
class RecipeIngredient {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;
  Recipe recipe;
  Ingredient ingredient;
  String quantity;

}
