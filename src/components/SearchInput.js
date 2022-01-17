import PropTypes from 'prop-types';
import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  HeaderContext,
} from '../context/RecipesContext';

function SearchInput({ title }) {
  const {
    setFilters,
    search,
    setSearch,
    handleSearchFoods,
    handleSearchDrinks,
    meal,
    drink,
    setShowDisplay,
  } = useContext(HeaderContext);

  const history = useHistory();

  const detailsScreenByFood = useCallback((foods) => {
    if (foods.length === 1) {
      const { idMeal } = foods[0];
      history.push(`/comidas/${idMeal}`);
    }
  }, [history]);

  useEffect(() => {
    if (meal.length === 1) {
      detailsScreenByFood(meal);
    }
  }, [meal, detailsScreenByFood]);

  const detailsScreenByDrink = useCallback((drinks) => {
    if (drinks.length === 1) {
      const { idDrink } = drinks[0];
      history.push(`/bebidas/${idDrink}`);
    }
  }, [history]);

  useEffect(() => {
    if (drink.length === 1) {
      detailsScreenByDrink(drink);
    }
  }, [drink, detailsScreenByDrink]);

  const handleFoodAndDrink = (titles) => {
    if (titles === 'Comidas') {
      handleSearchFoods();
    } if (titles === 'Bebidas') {
      handleSearchDrinks();
    }
  };

  return (
    <div className="searchBar">
      <input
        data-testid="search-input"
        className="search-input"
        type="text"
        value={ search }
        placeholder="Digite aqui..."
        onChange={ (event) => setSearch(event.target.value) }
      />

      <label htmlFor="ingredients">
        <input
          id="ingredients"
          value="Ingrediente"
          type="radio"
          name="filters"
          onChange={ (event) => setFilters(event.target.value) }
          data-testid="ingredient-search-radio"
          className="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          id="name"
          value="Nome"
          type="radio"
          name="filters"
          onChange={ (event) => setFilters(event.target.value) }
          data-testid="name-search-radio"
          className="ingredient-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          value="Primeira Letra"
          type="radio"
          name="filters"
          onChange={ (event) => setFilters(event.target.value) }
          data-testid="first-letter-search-radio"
          className="ingredient-search-radio"
        />
        Primeira Letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          handleFoodAndDrink(title);
          setShowDisplay(false);
          setSearch('');
        } }
      >
        Buscar
      </button>
    </div>
  );
}

SearchInput.propTypes = {
  title: PropTypes.string,
};

SearchInput.defaultProps = {
  title: '',
};

export default SearchInput;
