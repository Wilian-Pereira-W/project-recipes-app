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

const MAX_CARDS = 6;

function DrinksRecipeDetails() {
  const [showButton, setShowButton] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  const {
    drinksDetails,
    setDrinksDetails,
    share,
    setShare,
    setIngredients,
  } = useContext(DrinkRecipesContext);
  const { mealsRecipes } = useContext(FoodRecipesContext);

  const { pathname } = useLocation();
  const ID = pathname.split('/')[2];

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
      { share
        && (
          <div className="alert-container">
            <div className="alert">
              <p>Link copiado!</p>
              <button type="button" onClick={ () => setShare(false) }>X</button>
            </div>
          </div>)}
      <DrinksDetails />
      <div className="carousel">
        { mealsRecipes
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            index < MAX_CARDS
            && (
              <Card
                key={ idMeal }
                id={ idMeal }
                index={ index }
                name={ strMeal }
                img={ strMealThumb }
              />
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
