import React, { useContext, useEffect, useState } from 'react';
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

function DrinksDetails() {
  const [checked, setChecked] = useState([]);

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
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, checked]);

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
      <span data-testid="recipe-category">{`${strCategory} - ${strAlcoholic}`}</span>
      <section className="recipe-text-details">
        <h5>Ingredients</h5>
        { checkPathInProgress
          && Object.entries(ingredients).map((ingredient, index) => (
            <label
              htmlFor={ `${index}-ingredient-step` }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                className="ingredient-step"
                id={ `${index}-ingredient-step` }
                type="checkbox"
                onChange={ () => {
                  if (checked.includes(index)) {
                    setChecked(checked.filter((item) => item !== index));
                  } else {
                    setChecked([...checked, index]);
                  }
                } }
                checked={ checked.includes(index) }
              />
              <span>{`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}</span>
            </label>
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
