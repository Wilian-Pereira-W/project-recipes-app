// Tela de explorar: `/explorar`;
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/explore.css';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Loading from '../components/Loading';

function Explore() {
  const { isLoading } = useContext(DrinkRecipesContext);
  const history = useHistory();
  return (
    <div className="ctn-explore">
      { isLoading && <Loading /> }
      <Header title="Explorar" isEnableSearchIcon={ false } />
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
