import React from 'react';
import PropTypes from 'prop-types';
import { DrinkRecipesContext } from './RecipesContext';

function DrinkRecipesProvider({ children }) {
  return (
    <DrinkRecipesContext.Provider>
      {children}
    </DrinkRecipesContext.Provider>
  );
}

DrinkRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinkRecipesProvider;
