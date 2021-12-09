// Tela de explorar: `/explorar`;
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div className="ctn-explore">
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
    </div>
  );
}

export default Explore;
