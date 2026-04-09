# Savory Platform (Backend)

---

## Table of Contents
- [Links](#links)

---

**ToDo:**
- Implement the recipe image as a blob in stead of url string
  -  Implement image upload
- 

### Structural decisions
#### NoSQL

#### Multi Language Support
To keep things simple, I chose to allow the use of other languages by making translatable fields (recipe.tilte, 
recipe. Description, recipe. Instructions and ingredient.name) a List of String, instead of a single String. 
This way all we have to do to append new translations is add entries to the list.

The downside of this is that we have to keep track of the index of a specific language in the list, but since the
scope of this project for now remains small, I have decided this is not an issue.

The default language of our recipes will be Dutch. Later on I plan to add translations for English and Albanian.

**The alternative** of this approach would be a Map for each translatable field. E.g.
```java
Map<String, String> title = new HashMap<>();
```

That way you can simply request a specific language by passing the language as a query parameter:
```java
@SchemaMapping(typeName = "Recipe", field = "title")
public String getTitle(Recipe recipe, @Argument String lang) {
    return recipe.getTitle().getOrDefault(lang, "");
}
```

But by doing it this way, you introduce a bunch of boilerplate and another layer of complexity in the code which 
in my opinion is redundant in this case.

### Links
MongoDB UI:
```text
http://localhost:8081
```

GraphQl Playground:
```text
http://localhost:8080/graphiql
```

[Example Queries (CRUD Operations)](documentation/Example_GraphQL_Queries.md)

GraphQl Crud tutorial: https://www.youtube.com/watch?v=AgSO3rcSuHE  
Spring GraphQl Setup tutorial: https://spring.io/guides/gs/graphql-server

---
