// Tela de detalhes de uma receita de comida: `/comidas/{id-da-receita}`;
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FoodRecipesContext } from '../context/RecipesContext';
import { foodsAPI } from '../services/resquestAPI';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodsRecipeDetails() {
  const {
    mealsDetails,
    videoURL,
    setMealsDetails,
    setVideoURL,
  } = useContext(FoodRecipesContext);

  const history = useHistory();
  const { location: { pathname } } = history;
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

  const filteredIngredients = Object.entries(mealsDetails)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null)
    .map((ingredient) => ingredient[1]);

  const filteredMeasure = Object.entries(mealsDetails)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((measure) => measure[1] !== '' && measure[1] !== null)
    .map((measure) => measure[1]);

  const ingredients = {};
  filteredIngredients
    .forEach((ingredient, index) => {
      ingredients[ingredient] = filteredMeasure[index];
    });

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
  } = mealsDetails;

  return (
    <>
      <img
        src={ strMealThumb }
        alt="Foto da receita"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{strMeal}</h3>
      <input type="image" src={ shareIcon } alt="compartilhar" data-testid="share-btn" />
      <input
        type="image"
        src={ blackHeartIcon }
        alt="favoritar"
        data-testid="favorite-btn"
      />
      <span data-testid="recipe-category">{strCategory}</span>
      <h5>Ingredients</h5>
      <ul>
        { Object.entries(ingredients).map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[0]} ${ingredient[1]}`}
          </li>
        )) }
      </ul>
      <h5>Instructions</h5>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ videoURL }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
      />
      <div data-testid="0-recomendation-card" />
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </>
  );
}

export default FoodsRecipeDetails;
