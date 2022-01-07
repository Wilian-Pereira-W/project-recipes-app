import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { foodsAPI } from '../services/resquestAPI';

function ExploreFood() {
  const history = useHistory();
  const handleRandomFood = async () => {
    const { meals } = await foodsAPI('random.php');
    const { idMeal } = meals[0];
    history.push(`/comidas/${idMeal}`);
  };
  return (
    <div className="exploreFood">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes

      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem

      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleRandomFood }
      >
        Me Surpreenda!

      </button>
    </div>
  );
}

export default ExploreFood;
