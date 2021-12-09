import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DrinkRecipesProvider from './context/DrinkRecipesProvider';
import LoginProvider from './context/LoginProvider';
import FoodRecipesProvider from './context/FoodRecipesProvider';
import HeaderProvider from './context/HeaderProvider';

ReactDOM.render(
  <LoginProvider>
    <FoodRecipesProvider>
      <DrinkRecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </DrinkRecipesProvider>
    </FoodRecipesProvider>
  </LoginProvider>,

  document.getElementById('root'),
);

serviceWorker.unregister();
