import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/recipes.css';
import '../styles/details.css';

function CardRecommendations({ index, name, img, onClick }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <button
      type="button"
      data-testid={ pathname === '/comidas'
      || pathname === '/bebidas' || pathname === '/explorar/comidas/area'
        ? `${index}-recipe-card` : `${index}-recomendation-card` }
      className="card-recipes-recommendations"
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

CardRecommendations.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default CardRecommendations;
