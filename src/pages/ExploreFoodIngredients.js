// Tela de explorar comidas por ingrediente: `/explorar/comidas/ingredientes`;
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFoodIngredient from '../components/ExploreFoodIngredient';
import '../styles/explore.css';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Loading from '../components/Loading';

function ExploreFoodIngredients() {
  const { isLoading, setIsLoading } = useContext(DrinkRecipesContext);

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  return (
    <div className="explore-food-ingredients">
      { isLoading && <Loading /> }
      <Header title="Explorar Ingredientes" isEnableSearchIcon={ false } />
      <ExploreFoodIngredient />
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
