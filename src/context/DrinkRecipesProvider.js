import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DrinkRecipesContext } from './RecipesContext';
import { drinksAPI } from '../services/resquestAPI';

function DrinkRecipesProvider({ children }) {
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await drinksAPI.get('/search.php?s=');
      setDrinksRecipes(data.drinks);
    })();
  }, []);

  const context = {
    drinksRecipes,
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
