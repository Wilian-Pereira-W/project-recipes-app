import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './RecipesContext';
import { ingredientsAPI, nameAPI, firstLetterAPI } from '../services/resquestAPI';

function HeaderProvider({ children }) {
  const [showDisplay, setShowDisplay] = useState(false);
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');

  console.log(search);

  const handleClick = () => {
    if (showDisplay === false) {
      setShowDisplay(true);
    } else {
      setShowDisplay(false);
    }
  };

  const handleSearch = () => {
    if (filters === 'Ingrediente') {
      console.log(ingredientsAPI(search));
    } else if (filters === 'Nome') {
      console.log(nameAPI(search));
    } else if (search.length === 1) {
      console.log(firstLetterAPI(search));
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  return (
    <HeaderContext.Provider
      value={ { showDisplay, handleClick, setFilters, handleSearch, search, setSearch } }
    >
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
