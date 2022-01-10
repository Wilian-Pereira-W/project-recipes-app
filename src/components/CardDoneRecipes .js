// Tela de receitas favoritas: `/receitas-favoritas`.
import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes({ index, category, image, doneDate, tagName, name }) {
  return (
    <div>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      </div>
      <div>
        <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
        <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        //   onClick={ copyOnClipboard }
        />
        {tagName
          .map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}

            </p>
          ))}
      </div>
    </div>
  );
}

CardDoneRecipes.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
  tagName: PropTypes.string,
}.isRequired;

export default CardDoneRecipes;
