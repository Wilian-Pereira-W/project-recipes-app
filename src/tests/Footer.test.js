import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Footer from '../components/Footer';

describe('Testing footer component', () => {
  it('should be render FoodIcon', () => {
    renderWithRouter(
      <Footer />,
    );
    const foodIcon = screen.getByAltText(/Ícone de Comidas/i);
    expect(foodIcon).toBeDefined();
  });

  it('should be render DrinkIcon', () => {
    renderWithRouter(
      <Footer />,
    );
    const drinkIcon = screen.getByAltText(/Ícone de Bebidas/i);
    expect(drinkIcon).toBeDefined();
  });
});
