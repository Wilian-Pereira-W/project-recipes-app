import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { foodsAPI } from '../services/resquestAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteMeals';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';

function FoodsDetails() {
  const {
    mealsDetails,
    setMealsDetails,
  } = useContext(FoodRecipesContext);

  const {
    setShare,
    setIngredients,
    isFavorite,
    setIsFavorite,
    setClipboard,
    ingredients,
  } = useContext(DrinkRecipesContext);

  const {
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
  } = mealsDetails;

  const { pathname } = useLocation();
  const ID = pathname.split('/')[2];

  const checkPathInProgress = pathname.includes('in-progress');

  useEffect(() => {
    (async () => {
      if (ID !== '') {
        const { meals } = await foodsAPI(`lookup.php?i=${ID}`);
        setMealsDetails(meals[0]);
      }
    })();
  }, [ID, setMealsDetails]);

  useEffect(() => {
    ingredientsAndMeasures(mealsDetails, setIngredients);
  }, [mealsDetails, setIngredients]);

  const toggleFavoriteRecipes = () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeFavoriteRecipe(idMeal);
    } else {
      setIsFavorite(true);
      addFavoriteRecipe(mealsDetails);
    }
  };

  const copyOnClipboard = () => {
    setClipboard(window.location.href);
    setShare(true);
  };

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="Foto da receita"
        className="recipe-photo"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{strMeal}</h3>
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
      <span data-testid="recipe-category">{strCategory}</span>
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
              />
              <span>{`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}</span>
            </label>
          ))}
        { !checkPathInProgress && (
          <ul className="ingredients-list">
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

export default FoodsDetails;
