export default function toggleFavoriteRecipes(dependencies) {
  const {
    isFavorite,
    setIsFavorite,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    idRecipe,
    recipeDetails,
  } = dependencies;

  if (isFavorite) {
    setIsFavorite(false);
    removeFavoriteRecipe(idRecipe);
  } else {
    setIsFavorite(true);
    addFavoriteRecipe(recipeDetails);
  }
}
