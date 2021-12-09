import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './RecipesContext';

function HeaderProvider({ children }) {
  // const { pathname } = window.location;
  // const { newTitle, setTitle } = useState('');
  // const value = { newTitle, setTitle };
  // function title(pathname) {
  //   console.log(pathname);
  //   switch (pathname) {
  //   case '/comidas':
  //     return setTitle('Comidas');
  //   default:
  //     return console.log('Olá');
  //   }
  // }
  // console.log(title(pathname));
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
