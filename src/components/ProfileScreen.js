import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ProfileScreen() {
  const email = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile">
      <h3 data-testid="profile-email">{ email.email }</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Sair

      </button>
    </div>
  );
}

export default ProfileScreen;
