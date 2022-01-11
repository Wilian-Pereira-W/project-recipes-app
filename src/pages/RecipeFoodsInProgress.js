// Tela de receita em processo de comida: `/comidas/{id-da-receita}/in-progress`;
import React, { useContext } from 'react';
import FoodsDetails from '../components/FoodsDetails';
import { DrinkRecipesContext } from '../context/RecipesContext';

function RecipeFoodsInProgress() {
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
      <FoodsDetails />
    </>
  );
}

export default RecipeFoodsInProgress;
