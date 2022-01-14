import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { foodsAPI } from '../services/resquestAPI';
import { FoodRecipesContext } from '../context/RecipesContext';

function ExploreFoodIngredient() {
  const { setMealsRecipes } = useContext(FoodRecipesContext);
  const [mealsList, setMealsList] = useState([]);
  const history = useHistory();
  const MAX_CARDS = 12;

  useEffect(() => {
    (async () => {
      const { meals } = await foodsAPI('list.php?i=list');
      setMealsList(meals);
    })();
  }, []);

  const ingredientFoodFilter = async (ingrediente) => {
    history.push('/comidas');
    const { meals } = await foodsAPI(`filter.php?i=${ingrediente}`);
    if (meals !== null) {
      setMealsRecipes(meals);
    }
  };

  return (
    <section className="ctn-cards-explore">
      {mealsList.slice(0, MAX_CARDS).map((meal, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          className="ingredient-card"
          onClick={ () => ingredientFoodFilter(meal.strIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
            alt={ meal.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { meal.strIngredient }
          </p>
        </button>
      ))}
    </section>
  );
}

export default ExploreFoodIngredient;
