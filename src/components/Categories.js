import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FoodRecipesContext, DrinkRecipesContext } from '../context/RecipesContext';

function Categories({ categoryName, title }) {
  const { setSelectedCategoryFoods } = useContext(FoodRecipesContext);
  const { setSelectedCategoryDrinks } = useContext(DrinkRecipesContext);

  const setSelectedCategory = (name) => (title === 'Comidas'
    ? setSelectedCategoryFoods(name)
    : setSelectedCategoryDrinks(name)
  );

  return (
    <button
      type="button"
      onClick={ ({ target: { name } }) => setSelectedCategory(name) }
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
