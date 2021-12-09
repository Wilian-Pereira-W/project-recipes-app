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
    const foodButton = screen.getByAltText(/Ícone de Comidas/i);
    expect(foodButton).toBeDefined();
  });
});
