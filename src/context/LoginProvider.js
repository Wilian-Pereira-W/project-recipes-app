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

  const context = {
    user,
    setUser,
    isDisabled,
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
