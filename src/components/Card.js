import PropTypes from 'prop-types';
import React from 'react';
import '../styles/recipes.css';

function Card(props) {
  const { index, name, img } = props;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card-recipes"
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
    </div>
  );
}

Card.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default Card;
