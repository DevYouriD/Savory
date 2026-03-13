package org.example.savory.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
class Rating {

  Long id;
  User user;
  Recipe recipe;
  int score;

}
