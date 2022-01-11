export function doneDrinksRecipes(drinksDetails) {
  const doneDrink = {
    id: drinksDetails.idDrink,
    type: 'bebida',
    area: '',
    category: drinksDetails.strCategory,
    alcoholicOrNot: drinksDetails.strAlcoholic,
    name: drinksDetails.strDrink,
    image: drinksDetails.strDrinkThumb,
    doneDate: new Date().toLocaleDateString('pt-br'),
    tags: drinksDetails.strTags || [],
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  localStorage.setItem(
    'doneRecipes', JSON.stringify([...doneRecipes, doneDrink]),
  );

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  Object.assign(inProgressRecipes.cocktails, { [drinksDetails.idDrink]: [] });
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

export function doneFoodsRecipes(mealsDetails) {
  const doneFood = {
    id: mealsDetails.idMeal,
    type: 'comida',
    area: mealsDetails.strArea,
    category: mealsDetails.strCategory,
    alcoholicOrNot: '',
    name: mealsDetails.strMeal,
    image: mealsDetails.strMealThumb,
    doneDate: new Date().toLocaleDateString('pt-br'),
    tags: mealsDetails.strTags || [],
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  localStorage.setItem(
    'doneRecipes', JSON.stringify([...doneRecipes, doneFood]),
  );

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  Object.assign(inProgressRecipes.meals, { [mealsDetails.idMeal]: [] });
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

export function verifyDoneRecipe(ID) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const checkId = doneRecipes.some(({ id }) => id === ID);
  return checkId;
}
