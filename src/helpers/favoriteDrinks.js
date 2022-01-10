export function addFavoriteRecipe(drinksDetails) {
  const favoriteRecipe = {
    id: drinksDetails.idDrink,
    type: 'bebida',
    area: '',
    category: drinksDetails.strCategory,
    alcoholicOrNot: drinksDetails.strAlcoholic,
    name: drinksDetails.strDrink,
    image: drinksDetails.strDrinkThumb,
  };

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  localStorage.setItem(
    'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]),
  );
}

export function removeFavoriteRecipe(idDrink) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const filterFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== idDrink);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavoriteRecipes));
}
