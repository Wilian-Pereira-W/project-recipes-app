import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FoodRecipesContext, DrinkRecipesContext } from '../context/RecipesContext';
import '../styles/recipes.css';

function Card({ index, name, img, id }) {
  const { setIdFood } = useContext(FoodRecipesContext);
  const { setIdDrink } = useContext(DrinkRecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const foodOrDrink = (idRecipe) => {
    if (pathname.includes('comidas')) {
      setIdFood(idRecipe);
    }
    if (pathname.includes('bebidas')) {
      setIdDrink(idRecipe);
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      className="card-recipes"
      onClick={ () => {
        history.push(`${pathname}/${id}`);
        foodOrDrink(id);
      } }
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
