// Tela de explorar bebidas por ingrediente: `/explorar/bebidas/ingredientes`;
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreDrinkIngredient from '../components/ExploreDrinkIngredient';
import '../styles/explore.css';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Loading from '../components/Loading';

function ExploreDrinkIngredients() {
  const { isLoading, setIsLoading } = useContext(DrinkRecipesContext);

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  return (
    <div className="explore-drink-ingredients">
      { isLoading && <Loading /> }
      <Header title="Explorar Ingredientes" isEnableSearchIcon={ false } />
      <ExploreDrinkIngredient />
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
