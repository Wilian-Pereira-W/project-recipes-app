// Tela principal de receitas de comidas: `/comidas`
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DrinkRecipesContext, FoodRecipesContext } from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Categories from '../components/Categories';
import '../styles/recipes.css';
import Loading from '../components/Loading';

const MAX_CARDS = 12;
const MAX_CATEGORIES = 5;

function Foods() {
  const history = useHistory();
  const { mealsRecipes,
    mealsCategories,
    setSelectedCategoryFoods,
  } = useContext(FoodRecipesContext);
  const { isLoading } = useContext(DrinkRecipesContext);

  const handleCardClick = (id) => {
    history.push(`/comidas/${id}`);
  };

  return (
    isLoading
      ? <Loading />
      : (
        <div className="food--drink-page-container">
          <Header title="Comidas" isEnableSearchIcon />
          <div className="ctn-btn-categories">
            <button
              type="button"
              name="All"
              data-testid="All-category-filter"
              onClick={ ({ target: { name } }) => setSelectedCategoryFoods(name) }
            >
              All
            </button>
            { mealsCategories.map(({ strCategory }, index) => (
              index < MAX_CATEGORIES && (
                <Categories key={ index } categoryName={ strCategory } title="Comidas" />
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
              id={ idMeal }
              index={ index }
              name={ strMeal }
              img={ strMealThumb }
              onClick={ () => handleCardClick(idMeal) }
            />
          )
              )) }
          </section>
          <Footer />
        </div>
      )
  );
}

export default Foods;
