import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { drinksAPI } from '../services/resquestAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DrinkRecipesContext } from '../context/RecipesContext';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteDrinks';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import toggleFavoriteRecipes from '../helpers/toggleFavoriteRecipes';
import copyOnClipboard from '../helpers/copyOnClipboard';
import handleFavoriteRecipes from '../helpers/handleFavoriteRecipes';
import IngredientsCheckbox from './IngredientsCheckbox';
import IngredientsList from './IngredientsList';

function DrinksDetails({ checked, setChecked }) {
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
      const { drinks } = await drinksAPI(`lookup.php?i=${ID}`);
      setDrinksDetails(drinks[0]);
    })();
  }, [ID, setDrinksDetails]);

  useEffect(() => {
    ingredientsAndMeasures(drinksDetails, setIngredients);
  }, [drinksDetails, setIngredients]);

  useEffect(() => {
    const dependencies = { ID, setIsFavorite };
    handleFavoriteRecipes(dependencies);
  }, [ID, setIsFavorite]);

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt="Foto da receita"
        className="recipe-photo"
        data-testid="recipe-photo"
      />
      <h3 className="recipe-title" data-testid="recipe-title">{strDrink}</h3>
      <div className="icons-and-category">
        <span
          className="recipe-category"
          data-testid="recipe-category"
        >
          {`${strCategory} - ${strAlcoholic}`}
        </span>
        <div className="icons">
          <input
            type="image"
            src={ shareIcon }
            alt="compartilhar"
            data-testid="share-btn"
            onClick={ () => {
              const dependencies = {
                setClipboard,
                setShare,
              };
              copyOnClipboard(dependencies);
            } }
          />
          <input
            type="image"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favoritar"
            data-testid="favorite-btn"
            onClick={ () => {
              const dependencies = {
                isFavorite,
                setIsFavorite,
                addFavoriteRecipe,
                removeFavoriteRecipe,
                idRecipe: idDrink,
                recipeDetails: drinksDetails,
              };
              toggleFavoriteRecipes(dependencies);
            } }
          />
        </div>
      </div>
      <section className="recipe-text-details">
        <h5>Ingredients</h5>
        { checkPathInProgress
          && Object.entries(ingredients).map((ingredient, index) => (
            <IngredientsCheckbox
              key={ index }
              index={ index }
              ingredient={ ingredient }
              checked={ checked }
              setChecked={ setChecked }
            />
          ))}
        { !checkPathInProgress && (
          <ul>
            { Object.entries(ingredients).map((ingredient, index) => (
              <IngredientsList
                key={ index }
                index={ index }
                ingredient={ ingredient }
              />
            )) }
          </ul>
        )}
        <h5>Instructions</h5>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
    </div>
  );
}

DrinksDetails.propTypes = {
  checked: PropTypes.arrayOf.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default DrinksDetails;
