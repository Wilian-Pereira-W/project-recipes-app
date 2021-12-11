import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderContext } from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

function Header() {
  const { showDisplay, handleClick } = useContext(HeaderContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  function titleName() {
    switch (pathname) {
    case '/perfil': return 'Perfil';
    case '/explorar': return 'Explorar';
    case '/bebidas': return 'Bebidas';
    case '/comidas': return 'Comidas';
    case '/receitas-favoritas': return 'Receitas Favoritas';
    case '/explorar/bebidas': return 'Explorar Bebidas';
    case '/explorar/comidas': return 'Explorar Comidas';
    case '/explorar/comidas/ingredientes': return 'Explorar Ingredientes';
    case '/explorar/bebidas/ingredientes': return 'Explorar Ingredientes';
    case '/explorar/comidas/area': return 'Explorar Origem';
    case '/explorar/bebidas/area': return 'Explorar Origem';
    case '/receitas-feitas': return 'Receitas Feitas';
    default: return 'error';
    }
  }

  function exploreButton() {
    switch (pathname) {
    case '/perfil': return false;
    case '/explorar': return false;
    case '/bebidas': return true;
    case '/comidas': return true;
    case '/receitas-favoritas': return false;
    case '/explorar/bebidas': return false;
    case '/explorar/comidas': return false;
    case '/explorar/comidas/area': return true;
    case '/explorar/bebidas/area': return true;
    case '/explorar/comidas/ingredientes': return false;
    case '/explorar/bebidas/ingredientes': return false;
    case '/receitas-feitas': return false;

    default: return 'error';
    }
  }

  return (
    <header>
      <input
        type="image"
        className="profile-top-btn"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/perfil') }
        src={ profileIcon }
        alt="Ícone do perfil"
      />
      <h1
        type="text"
        data-testid="page-title"
      >
        {titleName()}
      </h1>
      { exploreButton() && (<input
        type="image"
        className="search-top-btn"
        data-testid="search-top-btn"
        onClick={ handleClick }
        src={ searchIcon }
        alt="Ícone de procurar"
      />)}
      {showDisplay && (
        <div>
          <input
            data-testid="search-input"
            type="text"
          />
        </div>
      )}
    </header>
  );
}

export default Header;
