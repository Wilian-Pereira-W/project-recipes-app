import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './RecipesContext';

function HeaderProvider({ children }) {
  const [showDisplay, setShowDisplay] = useState(false);

  const handleClick = () => {
    if (showDisplay === false) {
      setShowDisplay(true);
    } else {
      setShowDisplay(false);
    }
  };

  return (
    <HeaderContext.Provider value={ { showDisplay, handleClick } }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
