### Core Entities & Data Model

#### Recipe
- `id`: Long
- `title`: String
- `description`: String (short intro)
- `instructions`: String (rich text / HTML)
- `imageUrl`: String
- `preparationTime`: int (minutes)
- `cookingTime`: int (minutes)
- `servings`: int
- `ingredients`: List<RecipeIngredient>
- `categories`: List<Category>
- `tags`: List<Tag>
- `author`: User (optional)
- `comments`: List<Comment> (optional)
- `rating`: double (average)
- `createdAt`: LocalDateTime
- `updatedAt`: LocalDateTime

#### Ingredient
- `id`: Long
- `name`: String (e.g., "tomato")
- `unit`: String (e.g., "gram", "ml", "piece")

#### RecipeIngredient
- `id`: Long
- `recipe`: Recipe
- `ingredient`: Ingredient
- `quantity`: String (e.g., "2 cups", "150g")

#### Category
- `id`: Long
- `name`: String (e.g., "Dessert", "Dinner")

#### Tag
- `id`: Long
- `name`: String (e.g., "vegan", "gluten-free")

#### User
- `id`: Long
- `username`: String
- `email`: String
- `passwordHash`: String
- `recipes`: List<Recipe> (submitted by user)
- `comments`: List<Comment>

#### Comment
- `id`: Long
- `author`: User
- `recipe`: Recipe
- `content`: String
- `createdAt`: LocalDateTime

#### Rating
- `id`: Long
- `user`: User
- `recipe`: Recipe
- `score`: int (1-5)

---

### Relationships Summary
| Entity 1 | Relationship | Entity 2                          | Notes                                      |
|----------|--------------|-----------------------------------|--------------------------------------------|
| Recipe   | Many-to-Many | Category                          | A recipe can belong to multiple categories |
| Recipe   | Many-to-Many | Ingredient (via RecipeIngredient) | Quantities stored in join table            |
| Recipe   | Many-to-Many | Tag                               | Flexible labels                            |
| Recipe   | One-to-Many  | Comment                           | Optional, user feedback                    |
| Recipe   | One-to-Many  | Rating                            | Optional, compute average rating           |
| User     | One-to-Many  | Recipe                            | If users submit recipes                    |
| User     | One-to-Many  | Comment                           | Optional                                   |