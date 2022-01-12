export function verifyInProgressDrinks(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} };
  const keys = Object.keys(inProgressRecipes.cocktails);
  return keys.includes(id);
}

export function verifyInProgressMeals(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} };
  const keys = Object.keys(inProgressRecipes.meals);
  return keys.includes(id);
}
