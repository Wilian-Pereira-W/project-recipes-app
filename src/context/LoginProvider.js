import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoginContext } from './RecipesContext';

function LoginProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const context = {
    user,
    setUser,
  };

  return (
    <LoginContext.Provider value={ context }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
