// Tela de detalhes de uma receita de bebida: `/bebidas/{id-da-receita}`;
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { drinksAPI } from '../services/resquestAPI';
import Card from '../components/Card';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import '../styles/details.css';
import DrinksDetails from '../components/DrinksDetails';

const MAX_CARDS = 6;

function DrinksRecipeDetails() {
  const {
    drinksDetails,
    setDrinksDetails,
    share,
    setShare,
    setIsFavorite,
    setIngredients,
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

  useEffect(() => {
    ingredientsAndMeasures(drinksDetails, setIngredients);
  }, [drinksDetails, setIngredients]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favoriteRecipes.some(({ id }) => id === ID);
    return isFavoriteRecipe ? setIsFavorite(true) : setIsFavorite(false);
  }, [ID, setIsFavorite]);

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
      <DrinksDetails />
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
