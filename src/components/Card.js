import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/recipes.css';

function Card({ index, name, img, id }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <button
      type="button"
      data-testid={ pathname === '/comidas' || pathname === '/bebidas'
        ? `${index}-recipe-card` : `${index}-recomendation-card` }
      className="card-recipes"
      onClick={ () => history.push(`${pathname}/${id}`) }
    >
      <img
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p
        className="card-name"
        data-testid={ `${index}-card-name` }
      >
        {name}
      </p>
    </button>
  );
}

Card.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default Card;
