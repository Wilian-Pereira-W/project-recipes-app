// Tela de login: `/`
import React, { useContext } from 'react';
import { LoginContext } from '../context/RecipesContext';

export default function Login() {
  const { user, setUser } = useContext(LoginContext);

  const emailFormat = /\S+@\S+\.\S+/;
  const MIN_LENGTH = 6;

  return (
    <form onSubmit={ () => {} }>
      <label htmlFor="email-input">
        <input
          id="email-input"
          type="email"
          onChange={ ({ target: { value } }) => setUser({ ...user, email: value }) }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password-input">
        <input
          id="password-input"
          type="password"
          onChange={ ({ target: { value } }) => setUser({ ...user, password: value }) }
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(emailFormat.test(user.email) && user.password.length > MIN_LENGTH) }
      >
        Entrar
      </button>
    </form>
  );
}
