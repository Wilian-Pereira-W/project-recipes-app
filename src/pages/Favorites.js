// Tela de receitas favoritas: `/receitas-favoritas`.
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/favoriteAndDoneRecipes.css';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import { removeFavoriteRecipe } from '../helpers/favoriteDrinks';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Alert from '../components/Alert';

function Favorites() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [favoriteRecipeFilter, setFavoriteRecipeFilter] = useState([]);
  const { share } = useContext(DrinkRecipesContext);

  useEffect(() => {
    const favoriteRecipeStorage = localStorage.getItem('favoriteRecipes');

    if (favoriteRecipeStorage) {
      setFavoriteRecipe(JSON.parse(favoriteRecipeStorage));
      setFavoriteRecipeFilter(JSON.parse(favoriteRecipeStorage));
    }
  }, []);

  const handleRemoveFavoriteRecipe = (id) => {
    removeFavoriteRecipe(id);
    const favoriteRecipeStorage = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipeStorage) {
      setFavoriteRecipe(JSON.parse(favoriteRecipeStorage));
      setFavoriteRecipeFilter(JSON.parse(favoriteRecipeStorage));
    }
  };

  const validaFilter = (filtro, dados) => {
    if (filtro === 'Food') {
      const filterFood = dados.filter((recipe) => recipe.type === 'comida');
      setFavoriteRecipeFilter(filterFood);
    } else if (filtro === 'Drink') {
      const filterDrink = dados.filter((recipe) => recipe.type === 'bebida');
      setFavoriteRecipeFilter(filterDrink);
    } else {
      setFavoriteRecipeFilter(dados);
    }
  };

  const history = useHistory();

  const handleFilterClick = (value) => {
    validaFilter(value, favoriteRecipe);
  };

  const handleCardClick = (id, type) => {
    if (type === 'comida') {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  };

  return (
    <div className="favorite-recipes">
      { share
        && <Alert /> }
      <Header title="Receitas Favoritas" isEnableSearchIcon={ false } />
      <div className="favorite-recipes-categories">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleFilterClick(event.target.value) }
          value="All"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ (event) => handleFilterClick(event.target.value) }
          value="Food"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleFilterClick(event.target.value) }
          value="Drink"
        >
          Drink
        </button>
      </div>
      <section className="cards-container">
        {favoriteRecipeFilter
          .map((recipe, index) => (
            <CardRecipes
              key={ `${recipe.name}-${index}` }
              index={ index }
              type={ recipe.type }
              category={ recipe.category }
              image={ recipe.image }
              doneDate={ recipe.doneDate }
              tagName={ recipe.tags }
              name={ recipe.name }
              area={ recipe.area }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              id={ recipe.id }
              onClick={ () => handleCardClick(recipe.id, recipe.type) }
              onClickRemoveFavoriteRecipe={ () => handleRemoveFavoriteRecipe(recipe.id) }
            />
          )) }
      </section>
    </div>
  );
}

export default Favorites;
