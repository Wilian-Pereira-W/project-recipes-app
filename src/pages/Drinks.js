// Tela principal de receitas de bebidas: `/bebidas`;
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DrinkRecipesContext } from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';
import '../styles/recipes.css';

function Drinks() {
  const history = useHistory();
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;
  const { drinksRecipes,
    drinksCategories,
    setSelectedCategoryDrinks,
  } = useContext(DrinkRecipesContext);

  const handleCardClick = (id) => {
    history.push(`/bebidas/${id}`);
  };

  return (
    <>
      <Header title="Bebidas" isEnableSearchIcon />
      <div className="ctn-btn-categories">
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ ({ target: { name } }) => setSelectedCategoryDrinks(name) }
        >
          All
        </button>
        { drinksCategories.map(({ strCategory }, index) => (
          index < MAX_CATEGORIES && (
            <Categories key={ index } categoryName={ strCategory } title="Bebidas" />
          )
        )) }
      </div>
      <section className="ctn-card-recipes">
        { drinksRecipes
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            index < MAX_CARDS
            && (
              <Card
                key={ idDrink }
                id={ idDrink }
                index={ index }
                name={ strDrink }
                img={ strDrinkThumb }
                onClick={ () => handleCardClick(idDrink) }
              />
            )
          )) }
      </section>
      <Footer />
    </>
  );
}

export default Drinks;
