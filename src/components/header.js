import React from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const { location: {
    pathname,
  } } = useHistory();
  console.log(pathname);
  return (
    <header>
      <form>
        <input
          data-testid="profile-top-btn"
          type="image"
          alt={ profileIcon }
          src={ profileIcon }
        />
        <h1 data-testid="page-title">Olá</h1>
        <input
          data-testid="search-top-btn"
          type="image"
          alt={ searchIcon }
          src={ searchIcon }
        />
      </form>
    </header>
  );
}

export default Header;
