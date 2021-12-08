import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DrinkRecipesProvider from './context/DrinkRecipesProvider';
import LoginProvider from './context/LoginProvider';
import FoodRecipesProvider from './context/FoodRecipesProvider';

ReactDOM.render(
  <LoginProvider>
    <FoodRecipesProvider>
      <DrinkRecipesProvider>
        <App />
      </DrinkRecipesProvider>
    </FoodRecipesProvider>
  </LoginProvider>,

  document.getElementById('root'),
);

serviceWorker.unregister();
