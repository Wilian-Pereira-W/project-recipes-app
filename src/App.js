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
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/comidas/52771/in-progress"
          component={ RecipeFoodsInProgress }
        />
        <Route
          path="/bebidas/178319/in-progress"
          component={ RecipeDrinksInProgress }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodsByLocale } />
        <Route path="/comidas/:id" component={ FoodsRecipeDetails } />
        <Route path="/bebidas/:id" component={ DrinksRecipeDetails } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/receitas-feitas" component={ FinishedRecipes } />
        <Route path="/receitas-favoritas" component={ Favorites } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
