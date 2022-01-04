import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function FoodRecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { meals } = await foodsAPI('search.php?s=');
      setMealsRecipes(meals);
    })();
    (async () => {
      const { meals } = await foodsAPI('list.php?c=list');
      setMealsCategories(meals);
    })();
  }, []);

  const context = {
    mealsRecipes,
    mealsCategories,
    setMealsRecipes,
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
