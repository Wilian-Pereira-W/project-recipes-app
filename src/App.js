import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DrinksRecipeDetails from './pages/DrinksRecipeDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={Foods} />
        <Route exact path="/bebidas" component={Drinks} />
        <Route exact path="/comidas/{id-da-receita}" component={} />
        <Route exact path="/bebidas/{id-da-receita}" component={DrinksRecipeDetails} />
        <Route exact path="/comidas/{id-da-receita}/in-progress" component={Login} />
        <Route exact path="/bebidas/{id-da-receita}/in-progress" component={Login} />
        <Route exact path="/explorar" component={Login} />
        <Route exact path="/explorar/comidas" component={Login} />
        <Route exact path="/explorar/bebidas" component={Login} />
        <Route exact path="/explorar/comidas/ingredientes" component={Login} />
        <Route exact path="/explorar/bebidas/ingredientes" component={Login} />
        <Route exact path="/explorar/comidas/area" component={Login} />
        <Route exact path="/perfil" component={Login} />
        <Route exact path="/receitas-feitas" component={Login} />
        <Route exact path=" /receitas-favoritas" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
