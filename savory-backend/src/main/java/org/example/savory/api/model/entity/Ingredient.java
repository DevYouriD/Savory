package org.example.savory.api.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Builder(toBuilder = true)
public class Ingredient {

  @Builder.Default
  List<String> name = new ArrayList<>();

  private String unit;

  private Float  quantity;

}