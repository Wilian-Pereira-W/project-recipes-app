import React from 'react';

function InProgressRecipes() {
  return (
    <div>
      <img data-testid="recipe-photo" alt="recipe" />
      <h2 data-testid="recipe-title">title</h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h3 data-testid="recipe-category">category</h3>
      <input type="radio" data-testid="${index}-ingredient-step"/>
    </div>
  );
}

export default InProgressRecipes;
