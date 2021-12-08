import React from 'react';
import PropTypes from 'prop-types';
import { FoodRecipesContext } from './RecipesContext';

function FoodRecipesProvider({ children }) {
  return (
    <FoodRecipesContext.Provider>
      {children}
    </FoodRecipesContext.Provider>
  );
}

FoodRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodRecipesProvider;
