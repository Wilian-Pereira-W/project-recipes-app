import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DrinkRecipesContext } from './RecipesContext';
import { drinksAPI } from '../services/resquestAPI';

function DrinkRecipesProvider({ children }) {
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { drinks } = await drinksAPI('search.php?s=');
      setDrinksRecipes(drinks);
    })();
    (async () => {
      const { drinks } = await drinksAPI('list.php?c=list');
      setDrinksCategories(drinks);
    })();
  }, []);

  const context = {
    drinksRecipes,
    drinksCategories,
    setDrinksRecipes,
  };

  return (
    <DrinkRecipesContext.Provider value={ context }>
      {children}
    </DrinkRecipesContext.Provider>
  );
}

DrinkRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinkRecipesProvider;
