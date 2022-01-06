import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ProfileScreen() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const emailStorage = localStorage.getItem('user');

    if (emailStorage) {
      setEmail(JSON.parse(emailStorage).email);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile">
      <h3 data-testid="profile-email">{ email }</h3>
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
