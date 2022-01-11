// Tela de receitas favoritas: `/receitas-favoritas`.
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
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
}) {
  const {
    setClipboard,
    share,
    setShare,
  } = useContext(DrinkRecipesContext);

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
    <div>
      { share
        && (
          <div className="alert-container">
            <div className="alert">
              <p>Link copiado!</p>
              <button type="button" onClick={ () => setShare(false) }>X</button>
            </div>
          </div>)}
      <div>
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
        {
          type === 'comida' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {
                `${area} - ${category}`
              }
            </p>)
            : <p data-testid={ `${index}-horizontal-top-text` }>{`${alcoholicOrNot}`}</p>
        }
        <button
          type="button"
          onClick={ onClick }
        >
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        </button>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyOnClipboard(id, type) }
        />
        {type === 'comida'
        && tagName
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

CardRecipes.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
  tagName: PropTypes.string,
}.isRequired;

export default CardRecipes;
