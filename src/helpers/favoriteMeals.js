export function addFavoriteRecipe(mealsDetails) {
  const favoriteRecipe = {
    id: mealsDetails.idMeal,
    type: 'comida',
    area: mealsDetails.strArea,
    category: mealsDetails.strCategory,
    alcoholicOrNot: '',
    name: mealsDetails.strMeal,
    image: mealsDetails.strMealThumb,
  };

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  localStorage.setItem(
    'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]),
  );
}

export function removeFavoriteRecipe(idMeal) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const filterFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== idMeal);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavoriteRecipes));
}
