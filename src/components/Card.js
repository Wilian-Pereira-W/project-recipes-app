import PropTypes from 'prop-types';
import React from 'react';

function Card(props) {
  const { index, name, img } = props;
  return (
    <section data-testid={ `${index}-recipe-card` }>
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
    </section>
  );
}

Card.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default Card;
