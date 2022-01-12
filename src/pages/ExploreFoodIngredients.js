// Tela de explorar comidas por ingrediente: `/explorar/comidas/ingredientes`;
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFoodIngredient from '../components/ExploreFoodIngredient';
import '../styles/explore.css';

function ExploreFoodIngredients() {
  return (
    <div className="explore-food-ingredients">
      <Header title="Explorar Ingredientes" isEnableSearchIcon={ false } />
      <ExploreFoodIngredient />
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
