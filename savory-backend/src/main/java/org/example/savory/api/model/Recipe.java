package org.example.savory.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
class Recipe {

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
  List<Ingredient> ingredients;
  List<Category> categories;
  List<Tag> tags;
  // User author;
  // List<Comment> comments;
  // double rating;
  LocalDateTime createdAt;
  LocalDateTime updatedAt;

}
