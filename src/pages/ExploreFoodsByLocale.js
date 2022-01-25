// Tela de explorar comidas por local de origem: `/explorar/comidas/area`;
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FoodRecipesContext } from '../context/RecipesContext';
import { foodsAPI } from '../services/resquestAPI';
import Card from '../components/Card';

function ExploreFoodsByLocale() {
  const history = useHistory();
  const [mealsOrigin, setMealsOrigin] = useState([]);
  const MAX_CARDS = 12;
  const { mealsRecipes, setMealsRecipes,
  } = useContext(FoodRecipesContext);

  useEffect(() => {
    (async () => {
      const { meals } = await foodsAPI('list.php?a=list');
      setMealsOrigin(meals);
    })();
  }, []);

  const filterByArea = async (origem) => {
    if (origem === 'All') {
      const { meals } = await foodsAPI('search.php?s=');
      setMealsRecipes(meals);
    } else {
      const { meals } = await foodsAPI(`filter.php?a=${origem}`);
      setMealsRecipes(meals);
    }
  };

  const handleCardClick = (id) => {
    history.push(`/comidas/${id}`);
  };

  return (
    <div>
      <Header title="Explorar Origem" isEnableSearchIcon />
      <div className="explore-by-area">
        <select
          size="3"
          data-testid="explore-by-area-dropdown"
          name="select"
          className="explore-by-area-dropdown"
          onChange={ (event) => filterByArea(event.target.value) }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {mealsOrigin
            .map((origem, index) => (
              <option
                key={ `${origem.strArea} - ${index}` }
                data-testid={ `${origem.strArea}-option` }
                value={ origem.strArea }
              >
                {origem.strArea}
              </option>
            ))}
        </select>
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
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByLocale;
