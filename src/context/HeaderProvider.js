import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DrinkRecipesContext, FoodRecipesContext, HeaderContext } from './RecipesContext';
import { foodsAPI, drinksAPI } from '../services/resquestAPI';

function HeaderProvider({ children }) {
  const [showDisplay, setShowDisplay] = useState(false);
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const { setMealsRecipes } = useContext(FoodRecipesContext);
  const { setDrinksRecipes } = useContext(DrinkRecipesContext);

  const handleClick = () => {
    if (showDisplay === false) {
      setShowDisplay(true);
    } else {
      setShowDisplay(false);
    }
  };

  const handleSearchFoods = async () => {
    if (filters === 'Ingrediente') {
      const { meals } = await foodsAPI(`filter.php?i=${search}`);
      setMealsRecipes(meals);
    } else if (filters === 'Nome') {
      const { meals } = await foodsAPI(`search.php?s=${search}`);
      setMealsRecipes(meals);
    } else if (search.length === 1) {
      const { meals } = await foodsAPI(`search.php?f=${search}`);
      setMealsRecipes(meals);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchDrinks = async () => {
    if (filters === 'Ingrediente') {
      const { drinks } = await drinksAPI(`filter.php?i=${search}`);
      setDrinksRecipes(drinks);
    } else if (filters === 'Nome') {
      const { drinks } = await drinksAPI(`search.php?s=${search}`);
      setDrinksRecipes(drinks);
    } else if (search.length === 1) {
      const { drinks } = await drinksAPI(`search.php?f=${search}`);
      setDrinksRecipes(drinks);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const context = {
    showDisplay,
    handleClick,
    setFilters,
    search,
    setSearch,
    handleSearchDrinks,
    handleSearchFoods,
  };

  return (
    <HeaderContext.Provider
      value={ context }
    >
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
