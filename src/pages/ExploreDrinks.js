// Tela de explorar bebidas: `/explorar/bebidas`;
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreDrink from '../components/ExploreDrink';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" isEnableSearchIcon={ false } />
      <ExploreDrink />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
