import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { HeaderContext } from '../context/RecipesContext';

function SearchInput({ title }) {
  const {
    setFilters,
    search,
    setSearch,
    handleSearchFoods,
    handleSearchDrinks } = useContext(HeaderContext);
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
        onClick={ title === 'Comidas' ? handleSearchFoods : handleSearchDrinks }
      >
        Buscar
      </button>
    </div>
  );
}

SearchInput.propTypes = {
  title: PropTypes.string,
};

SearchInput.defaultProps = {
  title: '',
};

export default SearchInput;
