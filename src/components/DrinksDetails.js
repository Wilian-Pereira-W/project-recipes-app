import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

function DrinksDetails() {
  const [checked, setChecked] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

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

  useEffect(() => {
    const inProgressDefault = { cocktails: {}, meals: {} };
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || inProgressDefault;
    if (inProgressRecipes.cocktails[ID]) {
      setChecked(inProgressRecipes.cocktails[ID]);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, setChecked]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    Object.assign(inProgressRecipes.cocktails, { [ID]: checked });
    if (inProgressRecipes.cocktails[ID].length === Object.entries(ingredients).length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, checked, ingredients]);

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
      { checkPathInProgress && (
        <Link to="/receitas-feitas">
          <button
            type="button"
            className="finish-recipe-btn"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
          >
            Finalizar Receita
          </button>
        </Link>
      )}
    </div>
  );
}

export default DrinksDetails;
