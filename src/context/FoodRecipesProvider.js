import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function FoodRecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await foodsAPI.get('/search.php?s=');
      setMealsRecipes(data.meals);
    })();
  }, []);

  const context = {
    mealsRecipes,
  };

  return (
    <FoodRecipesContext.Provider value={ context }>
      {children}
    </FoodRecipesContext.Provider>
  );
}

FoodRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodRecipesProvider;
