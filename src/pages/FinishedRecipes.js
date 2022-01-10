// Tela de receitas feitas: `/receitas-feitas`;
import React, { useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes ';

function FinishedRecipes() {
  const [doneRecipes] = useState([
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
          />
        )) }
    </div>
  );
}

export default FinishedRecipes;
