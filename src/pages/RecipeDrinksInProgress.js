// Tela de receita em processo de bebida: `/bebidas/{id-da-receita}/in-progress`;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DrinksDetails from '../components/DrinksDetails';
import { DrinkRecipesContext } from '../context/RecipesContext';
import { doneDrinksRecipes } from '../helpers/doneRecipes';

function RecipeDrinksInProgress() {
  const { share, setShare, ingredients, drinksDetails } = useContext(DrinkRecipesContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState([]);

  const { pathname } = useLocation();
  const ID = pathname.split('/')[2];

  useEffect(() => {
    const inProgressDefault = { cocktails: {}, meals: {} };
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || inProgressDefault;
    if (inProgressRecipes.cocktails[ID]) {
      setChecked(inProgressRecipes.cocktails[ID]);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, setChecked]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    Object.assign(inProgressRecipes.cocktails, { [ID]: checked });
    if (inProgressRecipes.cocktails[ID].length === Object.entries(ingredients).length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [ID, checked, ingredients]);

  return (
    <>
      { share
      && (
        <div className="alert-container">
          <div className="alert">
            <p>Link copiado!</p>
            <button type="button" onClick={ () => setShare(false) }>X</button>
          </div>
        </div>)}
      <DrinksDetails checked={ checked } setChecked={ setChecked } />
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          disabled={ isDisabled }
          onClick={ () => doneDrinksRecipes(drinksDetails) }
        >
          Finalizar Receita
        </button>
      </Link>
    </>
  );
}

export default RecipeDrinksInProgress;
