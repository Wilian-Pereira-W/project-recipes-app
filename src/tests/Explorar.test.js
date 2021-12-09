import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Explore from '../pages/Explore';

describe('Testing Explore Page', () => {
  it('should be render a button with "Comidas"', () => {
    renderWithRouter(
      <Explore />,
    );
    const foodButton = screen.getByText(/Comidas/i);
    expect(foodButton).toBeDefined();
  });

  it('should be render a button with "Bebidas"', () => {
    renderWithRouter(
      <Explore />,
    );
    const drinkButton = screen.getByText(/Bebidas/i);
    expect(drinkButton).toBeDefined();
  });

  it('should be redirect to explore food page', () => {
    const { history } = renderWithRouter(
      <Explore />,
    );
    const foodButton = screen.getByText(/Comidas/i);
    userEvent.click(foodButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });
});
