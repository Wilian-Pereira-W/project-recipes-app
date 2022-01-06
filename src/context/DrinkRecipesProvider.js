import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DrinkRecipesContext } from './RecipesContext';
import { drinksAPI } from '../services/resquestAPI';

function DrinkRecipesProvider({ children }) {
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [selectedCategoryDrinks, setSelectedCategoryDrinks] = useState('');
  const [idDrink, setIdDrink] = useState('');
  const [drinksDetails, setDrinksDetails] = useState({});

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
    (async () => {
      const path = window.location.pathname.split('/')[1];
      const idRecipe = window.location.pathname.split('/')[2];

      if (path === 'bebidas') {
        const { drinks } = await drinksAPI(`lookup.php?i=${idDrink || idRecipe}`);
        setDrinksDetails(drinks[0]);
      }
    })();
  }, [idDrink]);

  const context = {
    drinksRecipes,
    drinksCategories,
    setDrinksRecipes,
    selectedCategoryDrinks,
    setSelectedCategoryDrinks,
    drinksDetails,
    setIdDrink,
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
