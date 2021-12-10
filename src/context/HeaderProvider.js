import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './RecipesContext';

function HeaderProvider({ children }) {
  const [input, setInput] = useState('');

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <HeaderContext.Provider value={ { input, handleChange } }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
