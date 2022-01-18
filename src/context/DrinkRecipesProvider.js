import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useClippy from 'use-clippy';
import { DrinkRecipesContext } from './RecipesContext';
import { drinksAPI } from '../services/resquestAPI';

function DrinkRecipesProvider({ children }) {
  const [clipboard, setClipboard] = useClippy();
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [selectedCategoryDrinks, setSelectedCategoryDrinks] = useState('');
  const [drinksDetails, setDrinksDetails] = useState({});
  const [share, setShare] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState({});

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

  useEffect(() => {
    if (selectedCategoryDrinks !== '' && selectedCategoryDrinks !== 'All') {
      (async () => {
        const { drinks } = await drinksAPI(`filter.php?c=${selectedCategoryDrinks}`);
        setDrinksRecipes(drinks);
      })();
    }
    if (selectedCategoryDrinks === 'All') {
      (async () => {
        const { drinks } = await drinksAPI('search.php?s=');
        setDrinksRecipes(drinks);
      })();
    }
  }, [selectedCategoryDrinks]);

  useEffect(() => {
    const inProgressDefault = { cocktails: {}, meals: {} };
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || inProgressDefault;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, []);

  const context = {
    drinksRecipes,
    drinksCategories,
    setDrinksRecipes,
    selectedCategoryDrinks,
    setSelectedCategoryDrinks,
    setDrinksDetails,
    drinksDetails,
    share,
    setShare,
    clipboard,
    setClipboard,
    isFavorite,
    setIsFavorite,
    ingredients,
    setIngredients,
    isLoading,
    setIsLoading,
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
