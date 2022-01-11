export function verifyInProgressDrinks(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const teste = inProgressRecipes.cocktails[id].length;
  return console.log(teste);
}

export function verifyInProgressMeals(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  return inProgressRecipes.meals[id].length > 0;
}
