import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { foodsAPI } from '../services/resquestAPI';
import shareIcon from '../images/shareIconYellow.svg';
import whiteHeartIcon from '../images/whiteHeartIconYellow.svg';
import blackHeartIcon from '../images/blackHeartIconYellow.svg';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteMeals';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import toggleFavoriteRecipes from '../helpers/toggleFavoriteRecipes';
import copyOnClipboard from '../helpers/copyOnClipboard';
import handleFavoriteRecipes from '../helpers/handleFavoriteRecipes';
import IngredientsCheckbox from './IngredientsCheckbox';
import IngredientsList from './IngredientsList';

function FoodsDetails({ checked, setChecked }) {
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

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="Foto da receita"
        className="recipe-photo"
        data-testid="recipe-photo"
      />
      <h3 className="recipe-title" data-testid="recipe-title">{strMeal}</h3>
      <div className="icons-and-category">
        <span
          className="recipe-category"
          data-testid="recipe-category"
        >
          {strCategory}
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
                idRecipe: idMeal,
                recipeDetails: mealsDetails,
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
          <ul className="ingredients-list">
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

FoodsDetails.propTypes = {
  checked: PropTypes.arrayOf.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default FoodsDetails;
