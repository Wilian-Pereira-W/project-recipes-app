import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './RecipesContext';

function HeaderProvider({ children }) {
  const [showDisplay, setInput] = useState(false);

  const handleChange = () => {
    if (showDisplay === false) {
      setInput(true);
    } else {
      setInput(false);
    }
  };

  return (
    <HeaderContext.Provider value={ { showDisplay, handleChange } }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
