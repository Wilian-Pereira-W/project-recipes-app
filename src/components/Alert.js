import React, { useContext } from 'react';
import { DrinkRecipesContext } from '../context/RecipesContext';

function Alert() {
  const TIMEOUT = 1500;
  const { setShare } = useContext(DrinkRecipesContext);

  setTimeout(() => {
    setShare(false);
  }, TIMEOUT);

  return (
    <div className="alert-container">
      <div className="alert">
        <span className="alert-text">Link copiado!</span>
      </div>
    </div>
  );
}

export default Alert;
