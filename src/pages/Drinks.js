// Tela principal de receitas de bebidas: `/bebidas`;
import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Card from '../components/Card';
import '../styles/recipes.css';

const MAX_CARDS = 12;

function Drinks() {
  const { drinksRecipes } = useContext(DrinkRecipesContext);

  return (
    <>
      <Header />
      <section className="ctn-card-recipes">
        { drinksRecipes
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            index < MAX_CARDS
            && (
              <Card
                key={ idDrink }
                index={ index }
                name={ strDrink }
                img={ strDrinkThumb }
              />
            )
          )) }
      </section>
      <Footer />
    </>
  );
}

export default Drinks;
