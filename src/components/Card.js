import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/recipes.css';

function Card({ index, name, img, onClick }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <button
      type="button"
      data-testid={ pathname === '/comidas'
       || pathname === '/bebidas' || pathname === '/explorar/comidas/area'
        ? `${index}-recipe-card` : `${index}-recomendation-card` }
      className="card-recipes"
      onClick={ onClick }
    >
      <img
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p
        className="card-name"
        data-testid={ pathname === '/comidas'
        || pathname === '/bebidas' || pathname === '/explorar/comidas/area'
          ? `${index}-card-name` : `${index}-recomendation-title` }
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
