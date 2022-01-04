import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FoodRecipesContext } from '../context/RecipesContext';

function Categories(props) {
  const { categoryName } = props;
  const { setSelectedCategory } = useContext(FoodRecipesContext);

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
