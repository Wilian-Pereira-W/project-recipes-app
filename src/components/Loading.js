import React, { useContext } from 'react';
import { DrinkRecipesContext } from '../context/RecipesContext';
import '../styles/loading.css';

function Loading() {
  const TIMEOUT = 1000;
  const { setIsLoading } = useContext(DrinkRecipesContext);

  setTimeout(() => {
    setIsLoading(false);
  }, TIMEOUT);

  return (
    <div className="ctn-loader">
      <div className="loader" />
    </div>
  );
}

export default Loading;
