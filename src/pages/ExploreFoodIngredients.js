// Tela de explorar comidas por ingrediente: `/explorar/comidas/ingredientes`;
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFoodIngredient from '../components/ExploreFoodIngredient';

function ExploreFoodIngredients() {
  return (
    <div className="exploreFoodIngredients">
      <Header title="Explorar Ingredientes" isEnableSearchIcon={ false } />
      <ExploreFoodIngredient />
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
