import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Header from '../components/Header';
import HeaderProvider from '../context/HeaderProvider';

describe('Testing header component', () => {
  it('should be render profileIcon', () => {
    renderWithRouter(
      <HeaderProvider>
        <Header />
        ,
      </HeaderProvider>,
    );
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    expect(profileIcon).toBeDefined();
  });

  it('should be render searchIcon', () => {
    renderWithRouter(
      <HeaderProvider>
        <Header />
        ,
      </HeaderProvider>,
    );
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(searchIcon).toBeDefined();
  });

  it('should be render a title', () => {
    renderWithRouter(
      <HeaderProvider>
        <Header />
        ,
      </HeaderProvider>,
    );
    const title = screen.getByRole('heading');
    expect(title).toBeDefined();
  });

  it('should be redirect to profile page', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <Header />
        ,
      </HeaderProvider>,
    );
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('should be render search bar after clicking at search Icon', () => {
    renderWithRouter(
      <HeaderProvider>
        <Header />
        ,
      </HeaderProvider>,
    );
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeDefined();
  });

  it('should be render correct title at "Comidas" page', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <Header />
      </HeaderProvider>,

    );
    history.push('/comidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
    const title = screen.queryByRole('heading');
    expect(title.textContent).toEqual(/Comidas/i);
  });
});
