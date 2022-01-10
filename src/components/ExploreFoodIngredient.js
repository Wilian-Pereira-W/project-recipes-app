import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { foodsAPI } from '../services/resquestAPI';
import { FoodRecipesContext } from '../context/RecipesContext';

function ExploreFoodIngredient() {
  const history = useHistory();
  const { setMealsRecipes } = useContext(FoodRecipesContext);
  const MAX_CARDS = 12;
  const [foods, setMeals] = useState([]);
  useEffect(() => {
    (async () => {
      const { meals } = await foodsAPI('list.php?i=list');
      setMeals(meals);
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
    foods.slice(0, MAX_CARDS).map((meal, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `${index}-ingredient-card` }
        className="cardIngrediente"
        onClick={ () => ingredientFoodFilter(meal.strIngredient) }
      >
        <img
          src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
          alt={ meal.strIngredient }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ meal.strIngredient }</p>
      </button>
    ))
  );
}

export default ExploreFoodIngredient;
