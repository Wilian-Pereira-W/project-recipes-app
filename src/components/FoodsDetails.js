import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { foodsAPI } from '../services/resquestAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteMeals';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import toggleFavoriteRecipes from '../helpers/toggleFavoriteRecipes';
import copyOnClipboard from '../helpers/copyOnClipboard';
import handleFavoriteRecipes from '../helpers/handleFavoriteRecipes';

function FoodsDetails() {
  const [checked, setChecked] = useState([]);

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
      const { meals } = await foodsAPI(`lookup.php?i=${ID}`);
      setMealsDetails(meals[0]);
    })();
  }, [ID, setMealsDetails]);

  useEffect(() => {
    ingredientsAndMeasures(mealsDetails, setIngredients);
  }, [mealsDetails, setIngredients]);

  useEffect(() => {
    const dependencies = { ID, setIsFavorite };
    handleFavoriteRecipes(dependencies);
  }, [ID, setIsFavorite]);

  useEffect(() => {
    const inProgressDefault = { cocktails: {}, meals: {} };
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || inProgressDefault;
    if (inProgressRecipes.meals[ID]) {
      setChecked(inProgressRecipes.meals[ID]);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, setChecked]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    Object.assign(inProgressRecipes.meals, { [ID]: checked });
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, checked]);

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
            idRecipe: idMeal,
            recipeDetails: mealsDetails,
          };
          toggleFavoriteRecipes(dependencies);
        } }
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
