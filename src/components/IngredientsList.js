import PropTypes from 'prop-types';
import React from 'react';

function IngredientsList({ index, ingredient }) {
  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}
    </li>
  );
}

IngredientsList.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsList;
