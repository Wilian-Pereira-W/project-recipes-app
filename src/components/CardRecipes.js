// Tela de receitas favoritas: `/receitas-favoritas`.
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIconYellow.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DrinkRecipesContext } from '../context/RecipesContext';

const HREF_LENGTH = 22;

function CardRecipes({ index,
  category,
  image,
  doneDate,
  tagName,
  name,
  id,
  area,
  onClick,
  type,
  alcoholicOrNot,
  onClickRemoveFavoriteRecipe,
}) {
  const {
    setClipboard,
    setShare,
  } = useContext(DrinkRecipesContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const [newHref, setHref] = useState('');

  const copyOnClipboard = (idRecipe, typeRecipe) => {
    if (newHref.length !== 0 && typeRecipe === 'comida') {
      setClipboard(`${newHref.slice(0, HREF_LENGTH)}comidas/${idRecipe}`);
    } else {
      setClipboard(`${newHref.slice(0, HREF_LENGTH)}bebidas/${idRecipe}`);
    }
    setShare(true);
  };

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <div className="done-recipes-card">
      <button
        type="button"
        onClick={ onClick }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </button>
      <div>
        {type === 'comida'
          ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${area} - ${category}`}
            </p>)
          : <p data-testid={ `${index}-horizontal-top-text` }>{`${alcoholicOrNot}`}</p>}
        <button
          type="button"
          onClick={ onClick }
          className="done-recipes-link"
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </button>
        {pathname === '/receitas-feitas'
          && (
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Feita em: ${doneDate}`}
            </p>)}
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          className="done-recipes-share-icon"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyOnClipboard(id, type) }
        />
        {pathname === '/receitas-favoritas'
        && <input
          type="image"
          src={ blackHeartIcon }
          alt="favoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ onClickRemoveFavoriteRecipe }
        />}
        <div>
          {pathname === '/receitas-feitas'
          && type === 'comida'
          && tagName
            .map((tag) => (
              <span
                key={ tag }
                className="tag"
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

CardRecipes.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
  tagName: PropTypes.string,
}.isRequired;

export default CardRecipes;
