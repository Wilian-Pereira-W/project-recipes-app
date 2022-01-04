import React, { useContext } from 'react';
import { HeaderContext } from '../context/RecipesContext';

function SearchInput() {
  const { setFilters, handleSearch, search, setSearch } = useContext(HeaderContext);
  return (
    <div className="searchBar">
      <input
        data-testid="search-input"
        type="text"
        value={ search }
        onChange={ (event) => setSearch(event.target.value) }
      />

      <label htmlFor="ingredients">
        Ingrediente
        <input
          id="ingredients"
          value="Ingrediente"
          type="radio"
          name="filters"
          onChange={ (event) => setFilters(event.target.value) }
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="name">
        Nome
        <input
          id="name"
          value="Nome"
          type="radio"
          name="filters"
          onChange={ (event) => setFilters(event.target.value) }
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="first-letter">
        Primeira Letra
        <input
          id="first-letter"
          value="Primeira Letra"
          type="radio"
          name="filters"
          onChange={ (event) => setFilters(event.target.value) }
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchInput;
