import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DrinksRecipeDetails from './pages/DrinksRecipeDetails';
import FoodsRecipeDetails from './pages/FoodsRecipeDetails';
import RecipeFoodsInProgress from './pages/RecipeFoodsInProgress';
import RecipeDrinksInProgress from './pages/RecipeDrinksInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodsByLocale from './pages/ExploreFoodsByLocale';
import Profile from './pages/Profile';
import FinishedRecipes from './pages/FinishedRecipes';
import Favorites from './pages/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/comidas/{id-da-receita}" component={ FoodsRecipeDetails } />
        <Route path="/bebidas/{id-da-receita}" component={ DrinksRecipeDetails } />
        <Route
          path="/comidas/{id-da-receita}/in-progress"
          component={ RecipeFoodsInProgress }
        />
        <Route
          path="/bebidas/{id-da-receita}/in-progress"
          component={ RecipeDrinksInProgress }
        />
        <Route path="/explorar" component={ Explore } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodsByLocale } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ FinishedRecipes } />
        <Route path="/receitas-favoritas" component={ Favorites } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
