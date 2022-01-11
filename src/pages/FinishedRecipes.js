// Tela de receitas feitas: `/receitas-feitas`;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/recipes.css';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes ';

const recipeList = [{
  id: '52771',
  type: 'comida',
  area: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta', 'Curry'],
},
{
  id: '178319',
  type: 'bebida',
  area: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: '23/06/2020',
  tags: [],
}];

function FinishedRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(recipeList);

  const [doneRecipesFilter, setDoneRecipesFilter] = useState(recipeList);

  // useEffect(() => {
  //   const doneRecipesStorage = localStorage.getItem('doneRecipes');

  //   if (doneRecipesStorage) {
  //     setDoneRecipes(JSON.parse(doneRecipesStorage));
  //     setDoneRecipesFilter(JSON.parse(doneRecipesStorage));
  // validaFiltro('All', JSON.parse(doneRecipesStorage));
  //   }
  // }, []);
  // criar no context

  const validaFiltro = (filtro, dados) => {
    if (filtro === 'Food') {
      const filterFood = dados.filter((recipe) => recipe.type === 'comida');
      setDoneRecipesFilter(filterFood);
    } else if (filtro === 'Drink') {
      const filterDrink = dados.filter((recipe) => recipe.type === 'bebida');
      setDoneRecipesFilter(filterDrink);
    } else {
      setDoneRecipesFilter(dados);
    }
  };

  const history = useHistory();

  const handleFilterClick = (value) => {
    validaFiltro(value, doneRecipes);
  };

  const handleCardClick = (id, type) => {
    if (type === 'comida') {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" isEnableSearchIcon={ false } />
      <div className="cardDoneRecipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (event) => handleFilterClick(event.target.value) }
          value="All"
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ (event) => handleFilterClick(event.target.value) }
          value="Food"
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleFilterClick(event.target.value) }
          value="Drink"
        >
          Drink

        </button>
      </div>
      {doneRecipesFilter
        .map((recipe, index) => (
          <CardRecipes
            key={ `${recipe.name}-${index}` }
            index={ index }
            type={ recipe.type }
            category={ recipe.category }
            image={ recipe.image }
            doneDate={ recipe.doneDate }
            tagName={ recipe.tags }
            name={ recipe.name }
            area={ recipe.area }
            alcoholicOrNot={ recipe.alcoholicOrNot }
            id={ recipe.id }
            onClick={ () => handleCardClick(recipe.id, recipe.type) }
          />
        )) }
    </div>
  );
}

export default FinishedRecipes;
