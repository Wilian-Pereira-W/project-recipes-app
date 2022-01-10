// Tela de detalhes de uma receita de bebida: `/bebidas/{id-da-receita}`;
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { drinksAPI } from '../services/resquestAPI';
import Card from '../components/Card';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteDrinks';
import '../styles/details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MAX_CARDS = 6;

function DrinksRecipeDetails() {
  const {
    drinksDetails,
    setDrinksDetails,
    share,
    setShare,
    setClipboard,
    isFavorite,
    setIsFavorite,
    ingredients,
    setIngredients,
  } = useContext(DrinkRecipesContext);
  const { mealsRecipes } = useContext(FoodRecipesContext);
  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = drinksDetails;

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
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favoriteRecipes.some(({ id }) => id === idDrink);
    return isFavoriteRecipe ? setIsFavorite(true) : setIsFavorite(false);
  }, [idDrink, setIsFavorite]);

  const toggleFavoriteRecipes = () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeFavoriteRecipe(idDrink);
    } else {
      setIsFavorite(true);
      addFavoriteRecipe(drinksDetails);
    }
  };

  const copyOnClipboard = () => {
    setClipboard(window.location.href);
    setShare(true);
  };

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
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favoritar"
        data-testid="favorite-btn"
        onClick={ toggleFavoriteRecipes }
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
              {`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}
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
