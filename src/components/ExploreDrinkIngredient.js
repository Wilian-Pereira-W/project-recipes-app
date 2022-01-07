import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { drinksAPI } from '../services/resquestAPI';
import { DrinkRecipesContext } from '../context/RecipesContext';

function ExploreDrinkIngredient() {
  const { setDrinksRecipes } = useContext(DrinkRecipesContext);
  const history = useHistory();
  const MAX_CARDS = 12;
  const [cocktails, setMeals] = useState([]);
  useEffect(() => {
    (async () => {
      const { drinks } = await drinksAPI('list.php?i=list');
      setMeals(drinks);
    })();
  }, []);

  const ingredientDrinkFilter = async (ingrediente) => {
    history.push('/bebidas');
    const { drinks } = await drinksAPI(`filter.php?i=${ingrediente}`);
    if (drinks !== null) {
      setDrinksRecipes(drinks);
    }
  };

  return (
    cocktails.slice(0, MAX_CARDS).map((drink, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `${index}-ingredient-card` }
        className="cardIngrediente"
        onClick={ () => ingredientDrinkFilter(drink.strIngredient1) }
      >
        <img
          src={
            `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png`
          }
          alt={ drink.strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          { drink.strIngredient1 }
        </p>
      </button>
    ))

  );
}

export default ExploreDrinkIngredient;
