import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function FoodRecipesProvider({ children }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [mealsRecipes, setMealsRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await foodsAPI.get('/list.php?c=list');
      setCategoriesList(data);
      console.log(data);
    })();
    (async () => {
      const { data } = await foodsAPI.get('/search.php?s=');
      setMealsRecipes(data);
      console.log(data);
    })();
  }, []);

  const context = {
    categoriesList,
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
