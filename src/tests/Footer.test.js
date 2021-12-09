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

  it('should be render ExplorerIcon', () => {
    renderWithRouter(
      <Footer />,
    );
    const explorerIcon = screen.getByAltText(/Ícone de Explorar/i);
    expect(explorerIcon).toBeDefined();
  });

  it('should be redirect to explore food page', () => {
    const { history } = renderWithRouter(
      <Footer />,
    );
    const foodIcon = screen.getByAltText(/Ícone de Comidas/i);
    userEvent.click(foodIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('should be redirect to explore drink page', () => {
    const { history } = renderWithRouter(
      <Footer />,
    );
    const drinkIcon = screen.getByAltText(/Ícone de Bebidas/i);
    userEvent.click(drinkIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('should be redirect to explore page', () => {
    const { history } = renderWithRouter(
      <Footer />,
    );
    const explorerIcon = screen.getByAltText(/Ícone de Explorar/i);
    userEvent.click(explorerIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});
