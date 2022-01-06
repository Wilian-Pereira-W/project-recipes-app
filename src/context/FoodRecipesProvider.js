import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';
import { foodsAPI } from '../services/resquestAPI';

function FoodRecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [selectedCategoryFoods, setSelectedCategoryFoods] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [idFood, setIdFood] = useState('');
  const [mealsDetails, setMealsDetails] = useState({});
  const [videoURL, setVideoURL] = useState('');
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

  useEffect(() => {
    (async () => {
      const path = window.location.pathname.split('/')[1];
      const idRecipe = window.location.pathname.split('/')[2];

      if (path === 'comidas') {
        const { meals } = await foodsAPI(`lookup.php?i=${idFood || idRecipe}`);
        setMealsDetails(meals[0]);
        const baseURL = 'https://www.youtube.com/embed/';
        const videoID = meals[0].strYoutube.split('=')[1];
        const URL = `${baseURL}${videoID}`;
        setVideoURL(URL);
      }
    })();
  }, [idFood]);

  const context = {
    mealsRecipes,
    mealsCategories,
    setMealsRecipes,
    setSelectedCategoryFoods,
    selectedCategoryFoods,
    isSelected,
    setIsSelected,
    setIdFood,
    mealsDetails,
    videoURL,
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
