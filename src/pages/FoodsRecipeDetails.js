// Tela de detalhes de uma receita de comida: `/comidas/{id-da-receita}`;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { foodsAPI } from '../services/resquestAPI';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import Card from '../components/Card';
import '../styles/details.css';
import '../styles/recipes.css';
import FoodsDetails from '../components/FoodsDetails';
import { verifyDoneRecipe } from '../helpers/doneRecipes';
import { verifyInProgressMeals } from '../helpers/verifyInProgress';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const MAX_CARDS = 6;

function FoodsRecipeDetails() {
  const [showButton, setShowButton] = useState();
  const [inProgress, setInProgress] = useState(false);

  const {
    mealsDetails,
    videoURL,
    setMealsDetails,
    setVideoURL,
  } = useContext(FoodRecipesContext);
  const {
    drinksRecipes,
    share,
    setIngredients,
    isLoading,
    setIsLoading,
  } = useContext(DrinkRecipesContext);

  const { pathname } = useLocation();
  const pathnameBase = pathname.split('/')[0];
  const ID = pathname.split('/')[2];

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    (async () => {
      if (ID !== '') {
        const { meals } = await foodsAPI(`lookup.php?i=${ID}`);
        setMealsDetails(meals[0]);
        const baseURL = 'https://www.youtube.com/embed/';
        const videoID = meals[0].strYoutube.split('=')[1];
        const URL = `${baseURL}${videoID}`;
        setVideoURL(URL);
      }
    })();
  }, [ID, setMealsDetails, setVideoURL]);

  useEffect(() => {
    ingredientsAndMeasures(mealsDetails, setIngredients);
  }, [mealsDetails, setIngredients]);

  useEffect(() => {
    setShowButton(verifyDoneRecipe(ID));
  }, [ID]);

  useEffect(() => {
    setInProgress(verifyInProgressMeals(ID));
  }, [ID]);

  return (
    <div className="details-container">
      { isLoading && <Loading /> }
      { share && <Alert /> }
      <FoodsDetails />
      <iframe
        data-testid="video"
        width="360"
        height="315"
        src={ videoURL }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
      />
      <div className="carousel">
        { drinksRecipes
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            index < MAX_CARDS
                && (
                  <Link to={ `${pathnameBase}/bebidas/${idDrink}` } key={ idDrink }>
                    <Card
                      id={ idDrink }
                      index={ index }
                      name={ strDrink }
                      img={ strDrinkThumb }
                    />
                  </Link>
                )
          )) }
      </div>
      {!showButton
          && (
            <Link to={ `/comidas/${ID}/in-progress` }>
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

export default FoodsRecipeDetails;
