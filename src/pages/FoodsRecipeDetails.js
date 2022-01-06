// Tela de detalhes de uma receita de comida: `/comidas/{id-da-receita}`;
import React, { useContext } from 'react';
import { FoodRecipesContext } from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodsRecipeDetails() {
  const { mealsDetails, videoURL } = useContext(FoodRecipesContext);

  const filteredIngredients = Object.entries(mealsDetails)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);

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
        { filteredIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient[1]}
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
