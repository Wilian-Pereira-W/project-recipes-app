import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { drinksAPI } from '../services/resquestAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DrinkRecipesContext } from '../context/RecipesContext';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteDrinks';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';

function DrinksDetails() {
  const { drinksDetails,
    setShare,
    setClipboard,
    setDrinksDetails,
    isFavorite,
    setIsFavorite,
    ingredients,
    setIngredients,
  } = useContext(DrinkRecipesContext);

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

  const checkPathInProgress = pathname.includes('in-progress');

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
    <div>
      <img
        src={ strDrinkThumb }
        alt="Foto da receita"
        className="recipe-photo"
        data-testid="recipe-photo"
      />
      <h3 className="recipe-title" data-testid="recipe-title">{strDrink}</h3>
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
        { checkPathInProgress
          && Object.entries(ingredients).map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
              />
              <span>{`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}</span>
            </div>
          ))}
        { !checkPathInProgress && (
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
        )}
        <h5>Instructions</h5>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      { checkPathInProgress && (
        <button
          type="button"
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      )}
    </div>
  );
}

export default DrinksDetails;
