import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function FoodRecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [selectedCategoryFoods, setSelectedCategoryFoods] = useState('');

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

  useEffect(() => {
    if (selectedCategoryFoods !== '') {
      (async () => {
        const { meals } = await foodsAPI(`filter.php?c=${selectedCategoryFoods}`);
        setMealsRecipes(meals);
      })();
    }
  }, [selectedCategoryFoods]);

  const context = {
    mealsRecipes,
    mealsCategories,
    setSelectedCategoryFoods,
    selectedCategoryFoods,
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
