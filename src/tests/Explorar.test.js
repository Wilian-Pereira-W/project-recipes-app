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
});
