import React from 'react';
import PropTypes from 'prop-types';
import { LoginContext } from './RecipesContext';

function LoginProvider({ children }) {
  return (
    <LoginContext.Provider>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
