// Tela principal de receitas de comidas: `/comidas`
import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FoodRecipesContext } from '../context/RecipesContext';
import Card from '../components/Card';

const MAX_CARDS = 12;

function Foods() {
  const { mealsRecipes } = useContext(FoodRecipesContext);

  return (
    <>
      <Header />
      { mealsRecipes
        .map(({ idMeal, strMeal, strMealThumb }, index) => (
          index < MAX_CARDS
          && (
            <Card
              key={ idMeal }
              index={ index }
              name={ strMeal }
              img={ strMealThumb }
            />
          )
        )) }
      <Footer />
    </>
  );
}

export default Foods;
