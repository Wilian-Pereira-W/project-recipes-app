import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { drinksAPI } from '../services/resquestAPI';
import { DrinkRecipesContext } from '../context/RecipesContext';

function ExploreDrinkIngredient() {
  const { setDrinksRecipes } = useContext(DrinkRecipesContext);
  const [drinksList, setDrinksList] = useState([]);
  const history = useHistory();
  const MAX_CARDS = 12;

  useEffect(() => {
    (async () => {
      const { drinks } = await drinksAPI('list.php?i=list');
      setDrinksList(drinks);
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
    <section className="ctn-cards-explore">
      {drinksList.slice(0, MAX_CARDS).map((drink, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          className="ingredient-card"
          onClick={ () => ingredientDrinkFilter(drink.strIngredient1) }
        >
          <img
            src={
              `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png`
            }
            alt={ drink.strIngredient1 }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { drink.strIngredient1 }
          </p>
        </button>
      ))}
    </section>
  );
}

export default ExploreDrinkIngredient;
