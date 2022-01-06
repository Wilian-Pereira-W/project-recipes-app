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
      data-testid={ `${index}-recipe-card` }
      className="card-recipes"
      onClick={ () => history.push(`${pathname}/${id}`) }
    >
      <img
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <span
        data-testid={ `${index}-card-name` }
      >
        {name}
      </span>
    </button>
  );
}

Card.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default Card;
