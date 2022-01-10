// Tela de detalhes de uma receita de comida: `/comidas/{id-da-receita}`;
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import { foodsAPI } from '../services/resquestAPI';
import ingredientsAndMeasures from '../helpers/ingredientsAndMeasures';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../helpers/favoriteMeals';
import Card from '../components/Card';
import '../styles/details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MAX_CARDS = 6;

function FoodsRecipeDetails() {
  const {
    mealsDetails,
    videoURL,
    setMealsDetails,
    setVideoURL,
    setIsStarted,
    isStarted,
    setRecipesStarted,
    recipesStarted,
  } = useContext(FoodRecipesContext);
  const {
    drinksRecipes,
    setClipboard,
    share,
    setShare,
    ingredients,
    setIngredients,
    isFavorite,
    setIsFavorite,
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

  useEffect(() => {
    (async () => {
      if (ID !== '') {
        const { meals } = await foodsAPI(`lookup.php?i=${ID}`);
        setMealsDetails(meals[0]);
        const baseURL = 'https://www.youtube.com/embed/';
        const videoID = meals[0].strYoutube.split('=')[1];
        const URL = `${baseURL}${videoID}`;
        setVideoURL(URL);
      }
    })();
  }, [ID, setMealsDetails, setVideoURL]);

  useEffect(() => {
    ingredientsAndMeasures(mealsDetails, setIngredients);
  }, [mealsDetails, setIngredients]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favoriteRecipes.some(({ id }) => id === idMeal);
    return isFavoriteRecipe ? setIsFavorite(true) : setIsFavorite(false);
  }, [idMeal, setIsFavorite]);

  const toggleFavoriteRecipes = () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeFavoriteRecipe(idMeal);
    } else {
      setIsFavorite(true);
      addFavoriteRecipe(mealsDetails);
    }
  };

  useEffect(() => {
    const containsId = recipesStarted.some((item) => item === ID);
    return containsId ? setIsStarted(true) : setIsStarted(false);
  }, [ID, recipesStarted, setIsStarted]);

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
      <iframe
        data-testid="video"
        width="360"
        height="315"
        src={ videoURL }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
      />
      <div className="carousel">
        { drinksRecipes
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            index < MAX_CARDS
            && (
              <Card
                key={ idDrink }
                id={ idDrink }
                index={ index }
                name={ strDrink }
                img={ strDrinkThumb }
              />
            )
          )) }
      </div>
      <Link to={ `/comidas/${ID}/in-progress` }>
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ () => {
            setRecipesStarted([...recipesStarted, ID]);
          } }
        >
          { isStarted ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </Link>
    </div>
  );
}

export default FoodsRecipeDetails;
