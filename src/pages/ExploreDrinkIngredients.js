// Tela de explorar bebidas por ingrediente: `/explorar/bebidas/ingredientes`;
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinkIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" isEnableSearchIcon={ false } />
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
