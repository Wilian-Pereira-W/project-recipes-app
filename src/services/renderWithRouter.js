import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import DrinkRecipesProvider from '../context/DrinkRecipesProvider';
import LoginProvider from '../context/LoginProvider';
import FoodRecipesProvider from '../context/FoodRecipesProvider';
import HeaderProvider from '../context/HeaderProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <LoginProvider>
          <FoodRecipesProvider>
            <DrinkRecipesProvider>
              <HeaderProvider>
                {component}
              </HeaderProvider>
            </DrinkRecipesProvider>
          </FoodRecipesProvider>
        </LoginProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
