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

const MAX_CARDS = 6;

function FoodsRecipeDetails() {
  const [showButton, setShowButton] = useState();

  const {
    mealsDetails,
    videoURL,
    setMealsDetails,
    setVideoURL,
  } = useContext(FoodRecipesContext);
  const {
    drinksRecipes,
    share,
    setShare,
    setIngredients,
  } = useContext(DrinkRecipesContext);

  const { pathname } = useLocation();
  const ID = pathname.split('/')[2];

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
              <Card
                key={ idDrink }
                id={ idDrink }
                index={ index }
                name={ strDrink }
                img={ strDrinkThumb }
              />
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
            Iniciar Receita
          </button>
        </Link>
      )}
    </div>
  );
}

export default FoodsRecipeDetails;
