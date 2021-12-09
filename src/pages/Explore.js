// Tela de explorar: `/explorar`;
import React from 'react';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div className="ctn-explore">
      <Header />
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
      <Footer />
    </div>
  );
}

export default Explore;
