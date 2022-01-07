// Tela de detalhes de uma receita de bebida: `/bebidas/{id-da-receita}`;
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { drinksAPI } from '../services/resquestAPI';
import Card from '../components/Card';
import '../styles/details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const MAX_CARDS = 6;

function DrinksRecipeDetails() {
  const {
    drinksDetails,
    setDrinksDetails,
    share,
    setShare,
    setClipboard,
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

  const filteredIngredients = Object.entries(drinksDetails)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null)
    .map((ingredient) => ingredient[1]);

  const filteredMeasure = Object.entries(drinksDetails)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((measure) => measure[1] !== '' && measure[1] !== null)
    .map((measure) => measure[1]);

  const ingredients = {};
  filteredIngredients
    .forEach((ingredient, index) => {
      ingredients[ingredient] = filteredMeasure[index];
    });

  const copyOnClipboard = () => {
    setClipboard(window.location.href);
    setShare(true);
  };

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = drinksDetails;

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
      <img
        src={ strDrinkThumb }
        alt="Foto da receita"
        className="recipe-photo"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{strDrink}</h3>
      <input
        type="image"
        src={ shareIcon }
        alt="compartilhar"
        data-testid="share-btn"
        onClick={ copyOnClipboard }
      />
      <input
        type="image"
        src={ whiteHeartIcon }
        alt="favoritar"
        data-testid="favorite-btn"
      />
      <span data-testid="recipe-category">{`${strCategory} - ${strAlcoholic}`}</span>
      <section className="recipe-text-details">
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
      </section>
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
      <Link to={ `/bebidas/${ID}/in-progress` }>
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}

export default DrinksRecipeDetails;
