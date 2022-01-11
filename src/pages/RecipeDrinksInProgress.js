// Tela de receita em processo de bebida: `/bebidas/{id-da-receita}/in-progress`;
import React, { useContext } from 'react';
import DrinksDetails from '../components/DrinksDetails';
import { DrinkRecipesContext } from '../context/RecipesContext';

function RecipeDrinksInProgress() {
  const { share, setShare } = useContext(DrinkRecipesContext);
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
      <DrinksDetails />
    </>
  );
}

export default RecipeDrinksInProgress;
