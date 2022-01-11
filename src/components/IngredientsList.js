import React from 'react';

function IngredientsList(key, index, ingredient) {
  return (
    <li
      key={ key }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}
    </li>
  );
}

export default IngredientsList;
