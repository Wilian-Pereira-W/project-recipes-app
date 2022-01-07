import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { drinksAPI } from '../services/resquestAPI';

function ExploreDrink() {
  const history = useHistory();
  const handleRandomDrink = async () => {
    const { drinks } = await drinksAPI('random.php');
    const { idDrink } = drinks[0];
    history.push(`/bebidas/${idDrink}`);
  };

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
        onClick={ handleRandomDrink }
      >
        Me Surpreenda!

      </button>
    </div>
  );
}

export default ExploreDrink;
