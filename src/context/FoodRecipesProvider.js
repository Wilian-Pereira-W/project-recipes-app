import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function FoodRecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [selectedCategoryFoods, setSelectedCategoryFoods] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [mealsDetails, setMealsDetails] = useState({});
  const [videoURL, setVideoURL] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [recipesStarted, setRecipesStarted] = useState([]);
  const [toggleHeart, setToggleHeart] = useState(false);
  const [favoriteRecipesId, setFavoriteRecipesId] = useState([]);

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
    if (selectedCategoryFoods !== '' && selectedCategoryFoods !== 'All') {
      (async () => {
        const { meals } = await foodsAPI(`filter.php?c=${selectedCategoryFoods}`);
        setMealsRecipes(meals);
      })();
    }
    if (selectedCategoryFoods === 'All') {
      (async () => {
        const { meals } = await foodsAPI('search.php?s=');
        setMealsRecipes(meals);
      })();
    }
  }, [selectedCategoryFoods]);

  const context = {
    mealsRecipes,
    mealsCategories,
    setMealsRecipes,
    setSelectedCategoryFoods,
    selectedCategoryFoods,
    isSelected,
    setIsSelected,
    mealsDetails,
    setMealsDetails,
    videoURL,
    setVideoURL,
    setIsStarted,
    isStarted,
    setRecipesStarted,
    recipesStarted,
    toggleHeart,
    setToggleHeart,
    favoriteRecipesId,
    setFavoriteRecipesId,
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
