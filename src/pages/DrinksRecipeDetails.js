// Tela de detalhes de uma receita de bebida: `/bebidas/{id-da-receita}`;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { drinksAPI } from '../services/resquestAPI';
import Card from '../components/Card';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import '../styles/details.css';
import '../styles/recipes.css';
import DrinksDetails from '../components/DrinksDetails';
import { verifyDoneRecipe } from '../helpers/doneRecipes';
import { verifyInProgressDrinks } from '../helpers/verifyInProgress';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const MAX_CARDS = 6;

function DrinksRecipeDetails() {
  const [showButton, setShowButton] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  const {
    drinksDetails,
    setDrinksDetails,
    share,
    setIngredients,
    isLoading,
    setIsLoading,
  } = useContext(DrinkRecipesContext);
  const { mealsRecipes } = useContext(FoodRecipesContext);

  const { pathname } = useLocation();
  const pathnameBase = pathname.split('/')[0];
  const ID = pathname.split('/')[2];

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    (async () => {
      if (ID !== '') {
        const { drinks } = await drinksAPI(`lookup.php?i=${ID}`);
        setDrinksDetails(drinks[0]);
      }
    })();
  }, [ID, setDrinksDetails]);

  useEffect(() => {
    ingredientsAndMeasures(drinksDetails, setIngredients);
  }, [drinksDetails, setIngredients]);

  useEffect(() => {
    setShowButton(verifyDoneRecipe(ID));
  }, [ID]);

  useEffect(() => {
    setInProgress(verifyInProgressDrinks(ID));
  }, [ID]);

  return (
    <div className="details-container">
      { isLoading && <Loading /> }
      { share && <Alert /> }
      <DrinksDetails />
      <div className="carousel">
        { mealsRecipes
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            index < MAX_CARDS
                && (
                  <Link to={ `${pathnameBase}/comidas/${idMeal}` } key={ idMeal }>
                    <Card
                      id={ idMeal }
                      index={ index }
                      name={ strMeal }
                      img={ strMealThumb }
                    />
                  </Link>
                )
          )) }
      </div>
      {!showButton
          && (
            <Link to={ `/bebidas/${ID}/in-progress` }>
              <button
                type="button"
                className="start-recipe-btn"
                data-testid="start-recipe-btn"
              >
                {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
              </button>
            </Link>
          )}
    </div>
  );
}

export default DrinksRecipeDetails;
