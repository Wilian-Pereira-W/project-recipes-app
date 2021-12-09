import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LoginContext } from './RecipesContext';

function LoginProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    function verifyEmailAndPassword() {
      const emailFormat = /\S+@\S+\.\S+/;
      const MIN_LENGTH = 6;
      const isValid = emailFormat.test(user.email) && user.password.length > MIN_LENGTH;
      return setIsDisabled(isValid);
    }
    verifyEmailAndPassword();
  }, [user]);

  function setUserStorage(event) {
    event.preventDefault();
    const TOKEN_NUMBER = 1;
    localStorage.setItem('mealsToken', JSON.stringify(TOKEN_NUMBER));
    localStorage.setItem('cocktailsToken', JSON.stringify(TOKEN_NUMBER));
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
  }

  const context = {
    user,
    setUser,
    isDisabled,
    setUserStorage,
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
