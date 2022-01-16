import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DrinkRecipesContext, FoodRecipesContext, HeaderContext } from './RecipesContext';
import { foodsAPI, drinksAPI } from '../services/resquestAPI';

function HeaderProvider({ children }) {
  const [showDisplay, setShowDisplay] = useState(false);
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const { setMealsRecipes } = useContext(FoodRecipesContext);
  const { setDrinksRecipes } = useContext(DrinkRecipesContext);

  const handleClick = () => {
    if (showDisplay === false) {
      setShowDisplay(true);
    } else {
      setShowDisplay(false);
    }
  };

  const noFoodRecipe = (foods) => {
    if (foods === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const noDrinkRecipe = (drinks) => {
    if (drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const handleSearchFoods = async () => {
    if (filters === 'Ingrediente') {
      const { meals } = await foodsAPI(`filter.php?i=${search}`);
      if (meals !== null) {
        setMealsRecipes(meals);
        setMeal(meals);
      }
      noFoodRecipe(meals);
    } else if (filters === 'Nome') {
      const { meals } = await foodsAPI(`search.php?s=${search}`);
      if (meals !== null) {
        setMealsRecipes(meals);
        setMeal(meals);
      }
      noFoodRecipe(meals);
    } else if (search.length === 1) {
      const { meals } = await foodsAPI(`search.php?f=${search}`);
      if (meals !== null) {
        setMealsRecipes(meals);
        setMeal(meals);
      }
      noFoodRecipe(meals);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleSearchDrinks = async () => {
    if (filters === 'Ingrediente') {
      const { drinks } = await drinksAPI(`filter.php?i=${search}`);
      if (drinks !== null) {
        setDrinksRecipes(drinks);
        setDrink(drinks);
      }
      noDrinkRecipe(drinks);
    } else if (filters === 'Nome') {
      const { drinks } = await drinksAPI(`search.php?s=${search}`);
      if (drinks !== null) {
        setDrinksRecipes(drinks);
        setDrink(drinks);
      }
      noDrinkRecipe(drinks);
    } else if (search.length === 1) {
      const { drinks } = await drinksAPI(`search.php?f=${search}`);
      if (drinks !== null) {
        setDrinksRecipes(drinks);
        setDrink(drinks);
      }
      noDrinkRecipe(drinks);
      setDrinksRecipes(drinks);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const context = {
    showDisplay,
    setShowDisplay,
    handleClick,
    setFilters,
    search,
    setSearch,
    handleSearchDrinks,
    handleSearchFoods,
    meal,
    drink,
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
