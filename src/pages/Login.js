// Tela de login: `/`
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/RecipesContext';
import '../styles/login.css';
import foodGif from '../images/ezgif.com-gif-maker.gif';

export default function Login() {
  const { user, setUser, isDisabled, setUserStorage } = useContext(LoginContext);
  const history = useHistory();

  return (
    <div className="ctn-login">
      <img className="food-gif" src={ foodGif } alt="food" />
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
          disabled={ !isDisabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
