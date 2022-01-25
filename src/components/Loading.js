import React, { useContext } from 'react';
import { DrinkRecipesContext } from '../context/RecipesContext';
import '../styles/loading.css';

function Loading() {
  const TIMEOUT = 700;
  const { setIsLoading } = useContext(DrinkRecipesContext);

  setTimeout(() => {
    setIsLoading(false);
  }, TIMEOUT);

  return (
    <div className="ctn-loader">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;
