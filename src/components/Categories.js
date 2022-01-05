import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FoodRecipesContext, DrinkRecipesContext } from '../context/RecipesContext';

function Categories({ categoryName, title }) {
  const {
    setSelectedCategoryFoods,
    selectedCategoryFoods,
    isSelected,
    setIsSelected,
  } = useContext(FoodRecipesContext);

  const {
    setSelectedCategoryDrinks,
    selectedCategoryDrinks,
  } = useContext(DrinkRecipesContext);

  const setSelectedCategory = (name) => (title === 'Comidas'
    ? setSelectedCategoryFoods(name)
    : setSelectedCategoryDrinks(name)
  );

  const hasBeenSelected = () => (isSelected === false
    ? setIsSelected(true)
    : setIsSelected(false));

  const isEqual = (name) => {
    if (selectedCategoryFoods === name && isSelected) {
      setSelectedCategoryFoods('All');
    }
    if (selectedCategoryDrinks === name && isSelected) {
      setSelectedCategoryDrinks('All');
    }
  };

  return (
    <button
      type="button"
      onClick={ ({ target: { name } }) => {
        setSelectedCategory(name);
        hasBeenSelected();
        isEqual(name);
      } }
      data-testid={ `${categoryName}-category-filter` }
      name={ categoryName }
    >
      { categoryName.split(' ')[0].split('/')[0] }
    </button>
  );
}

Categories.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;

export default Categories;
