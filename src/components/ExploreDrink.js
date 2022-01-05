import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ExploreDrink() {
  const history = useHistory();
  return (
    <div className="exploreDrink">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes

      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!

      </button>
    </div>
  );
}

export default ExploreDrink;
