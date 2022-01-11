export default function handleFavoriteRecipes({ ID, setIsFavorite }) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFavoriteRecipe = favoriteRecipes.some(({ id }) => id === ID);
  return isFavoriteRecipe ? setIsFavorite(true) : setIsFavorite(false);
}
