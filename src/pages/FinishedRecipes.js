// Tela de receitas feitas: `/receitas-feitas`;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes ';

function FinishedRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([
    {
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
    },
  ]);

  const history = useHistory();

  const handleFilterClick = (value) => {
    if (value === 'Food') {
      const filterFood = doneRecipes.filter((recipe) => recipe.type === 'comida');
      console.log(filterFood);
      setDoneRecipes(filterFood);
    } else if (value === 'Drink') {
      console.log(doneRecipes);
      const filterDrink = doneRecipes.filter((recipe) => recipe.type === 'bebida');
      console.log(filterDrink);
      setDoneRecipes(filterDrink);
    } else {
      setDoneRecipes(doneRecipes);
    }
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
      {doneRecipes
        .map((recipe, index) => (
          <CardDoneRecipes
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
            onClickFilter={ (event) => handleFilterClick(event.target.value) }
          />
        )) }
    </div>
  );
}

export default FinishedRecipes;
