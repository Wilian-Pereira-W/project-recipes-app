import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Header from '../components/Footer';

describe('Testing header component', () => {
  it('should be render profileIcon', () => {
    renderWithRouter(
      <Header />,
    );
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    expect(profileIcon).toBeDefined();
  });

  it('should be render searchIcon', () => {
    renderWithRouter(
      <Header />,
    );
    const searchIcon = screen.getByAltText(/Ícone de explorar/i);
    expect(searchIcon).toBeDefined();
  });

  it('should be redirect to profile page', () => {
    const { history } = renderWithRouter(
      <Header />,
    );
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('should be redirect to search page', () => {
    const { history } = renderWithRouter(
      <Header />,
    );
    const profileIcon = screen.getByAltText(/Ícone de explorar/i);
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
