// Tela de receitas favoritas: `/receitas-favoritas`.
import React from 'react';
import Header from '../components/Header';

function Favorites() {
  return (
    <Header title="Receitas Favoritas" isEnableSearchIcon={ false } />
  );
}

export default Favorites;
