import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext, HeaderContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function HeaderProvider({ children }) {
  const [showDisplay, setShowDisplay] = useState(false);
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const { setMealsRecipes, mealsRecipes } = useContext(FoodRecipesContext);

  const handleClick = () => {
    if (showDisplay === false) {
      setShowDisplay(true);
    } else {
      setShowDisplay(false);
    }
  };

  const handleSearch = async () => {
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

  useEffect(() => {
    console.log(mealsRecipes);
  }, [mealsRecipes]);

  return (
    <HeaderContext.Provider
      value={ { showDisplay, handleClick, setFilters, handleSearch, search, setSearch } }
    >
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
