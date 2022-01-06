// Tela de explorar comidas: `/explorar/comidas`;
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFood from '../components/ExploreFood';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explorar Comidas" isEnableSearchIcon={ false } />
      <ExploreFood />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
