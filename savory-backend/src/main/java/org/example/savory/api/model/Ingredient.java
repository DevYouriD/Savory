package org.example.savory.api.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ingredients")
@Getter @Setter
@NoArgsConstructor
class Ingredient {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String unit;

  @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

  public Ingredient(String name, String unit) {
    this.name = name;
    this.unit = unit;
  }

}