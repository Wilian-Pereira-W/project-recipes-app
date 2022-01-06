// Tela de detalhes de uma receita de bebida: `/bebidas/{id-da-receita}`;
import React, { useContext } from 'react';
import { DrinkRecipesContext } from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksRecipeDetails() {
  const { drinksDetails } = useContext(DrinkRecipesContext);

  const filteredIngredients = Object.entries(drinksDetails)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
  } = drinksDetails;

  return (
    <>
      <img
        src={ strDrinkThumb }
        alt="Foto da receita"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{strDrink}</h3>
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
      <div data-testid="0-recomendation-card" />
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </>
  );
}

export default DrinksRecipeDetails;
