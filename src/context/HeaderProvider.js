import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './RecipesContext';

function HeaderProvider({ children }) {
  return (
    <HeaderContext.Provider>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
