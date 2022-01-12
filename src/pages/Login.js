// Tela de login: `/`
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/RecipesContext';
import '../styles/login.css';

export default function Login() {
  const { user, setUser, isDisabled, setUserStorage } = useContext(LoginContext);
  const history = useHistory();

  return (
    <div className="ctn-login">
      <h1>Quack Foods</h1>
      <h2>[ Sua receita a um clique! ]</h2>
      <form
        onSubmit={ (event) => {
          setUserStorage(event);
          history.push('/comidas');
        } }
      >
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="email"
            onChange={ ({ target: { value } }) => setUser({ ...user, email: value }) }
            data-testid="email-input"
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            onChange={ ({ target: { value } }) => setUser({ ...user, password: value }) }
            data-testid="password-input"
            placeholder="Password"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isDisabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
