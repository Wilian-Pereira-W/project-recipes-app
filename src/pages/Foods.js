// Tela principal de receitas de comidas: `/comidas`
import React, { useContext } from 'react';
import { FoodRecipesContext } from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';
import '../styles/recipes.css';

const MAX_CARDS = 12;
const MAX_CATEGORIES = 5;

function Foods() {
  const { mealsRecipes, mealsCategories } = useContext(FoodRecipesContext);

  return (
    <>
      <Header />
      <div className="ctn-btn-categories">
        <button type="button">
          All
        </button>
        { mealsCategories.map(({ strCategory }, index) => (
          index < MAX_CATEGORIES && (
            <Categories key={ index } categoryName={ strCategory } />
          )
        )) }
      </div>
      <section className="ctn-card-recipes">
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
      </section>
      <Footer />
    </>
  );
}

export default Foods;
