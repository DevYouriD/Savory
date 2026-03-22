package org.example.savory.api.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Document(collection = "recipes")
public class Recipe {

  @Id
  String id;
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
  @Builder.Default
  List<Ingredient> ingredients = new ArrayList<>();

}
