export default function ingredientsAndMeasures(mealOrDrink, setState) {
  const ingredients = {};

  const ingredientsTemp = Object.entries(mealOrDrink)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null)
    .map((ingredient) => ingredient[1]);

  const measureTemp = Object.entries(mealOrDrink)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((measure) => measure[1] !== '' && measure[1] !== null)
    .map((measure) => measure[1]);

  ingredientsTemp
    .forEach((ingredient, index) => {
      ingredients[ingredient] = measureTemp[index];
    });

  setState(ingredients);
}
