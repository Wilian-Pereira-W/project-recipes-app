import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Header from '../components/Header';

describe('Testing header component', () => {
  it('should be render profileIcon', () => {
    renderWithRouter(<Header />);

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    expect(profileIcon).toBeDefined();
  });

  it('should be render searchIcon', () => {
    renderWithRouter(<Header />);

    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(searchIcon).toBeDefined();
  });

  it('should be render a title', () => {
    renderWithRouter(<Header />);

    const title = screen.getByRole('heading');
    expect(title).toBeDefined();
  });

  it('should be redirect to profile page after clicking at profile Icon', () => {
    const { history } = renderWithRouter(<Header />);
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('should be render search bar after clicking at search Icon', () => {
    renderWithRouter(<Header />);

    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeDefined();
  });

  it('should be render correct elements at "Comidas" page', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/comidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
    const title = screen.getByRole('heading');
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(title).toBeDefined();
    expect(profileIcon).toBeDefined();
    expect(searchIcon).toBeDefined();
  });

  it('should be render correct elements at "Bebidas" page', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/bebidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const title = screen.getByRole('heading');
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(profileIcon).toBeDefined();
    expect(title).toBeDefined();
    expect(searchIcon).toBeDefined();
  });

  it('should be render correct elements at "Explorar" page', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/explorar');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const title = screen.getByRole('heading');
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(profileIcon).toBeDefined();
    expect(title).toBeDefined();
    expect('/explorar').not.toContain(searchIcon);
  });

  it('should be render correct elements at "Perfil" page', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/perfil');
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const title = screen.getByRole('heading');
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(profileIcon).toBeDefined();
    expect(title).toBeDefined();
    expect('/perfil').not.toContain(searchIcon);
  });

  it('should be render correct elements at "Receitas Favoritas" page', () => {
    const { history } = renderWithRouter(<Header />);

    const END_POINT = '/receitas-favoritas';
    history.push(END_POINT);
    const { pathname } = history.location;
    expect(pathname).toBe(END_POINT);

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const title = screen.getByRole('heading');
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(profileIcon).toBeDefined();
    expect(title).toBeDefined();
    expect(END_POINT).not.toContain(searchIcon);
  });

  it('should be render correct elements at "Explorar Bebidas" page', () => {
    const { history } = renderWithRouter(<Header />);

    const END_POINT = '/explorar/bebidas';
    history.push(END_POINT);
    const { pathname } = history.location;
    expect(pathname).toBe(END_POINT);

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const title = screen.getByRole('heading');
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(profileIcon).toBeDefined();
    expect(title).toBeDefined();
    expect(END_POINT).not.toContain(searchIcon);
  });

  it('should be render correct elements at "Explorar Comidas" page', () => {
    const { history } = renderWithRouter(<Header />);

    const END_POINT = '/explorar/comidas';
    history.push(END_POINT);
    const { pathname } = history.location;
    expect(pathname).toBe(END_POINT);

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const title = screen.getByRole('heading');
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    expect(profileIcon).toBeDefined();
    expect(title).toBeDefined();
    expect(END_POINT).not.toContain(searchIcon);
  });

  it('should be render correct elements at "Explorar Comidas por ingredientes" page',
    () => {
      const { history } = renderWithRouter(<Header />);

      const END_POINT = '/explorar/comidas/ingredientes';
      history.push(END_POINT);
      const { pathname } = history.location;
      expect(pathname).toBe(END_POINT);

      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const title = screen.getByRole('heading');
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      expect(profileIcon).toBeDefined();
      expect(title).toBeDefined();
      expect(END_POINT).not.toContain(searchIcon);
    });
  it('should be render correct elements at "Explorar Bebidas por ingredientes" page',
    () => {
      const { history } = renderWithRouter(<Header />);

      const END_POINT = '/explorar/bebidas/ingredientes';
      history.push(END_POINT);
      const { pathname } = history.location;
      expect(pathname).toBe(END_POINT);

      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const title = screen.getByRole('heading');
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      expect(profileIcon).toBeDefined();
      expect(title).toBeDefined();
      expect(END_POINT).not.toContain(searchIcon);
    });
  it('should be render correct elements at "Explorar Bebidas por Origem" page',
    () => {
      const { history } = renderWithRouter(<Header />);

      const END_POINT = '/explorar/bebidas/area';
      history.push(END_POINT);
      const { pathname } = history.location;
      expect(pathname).toBe(END_POINT);

      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const title = screen.getByRole('heading');
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      expect(profileIcon).toBeDefined();
      expect(title).toBeDefined();
      expect(END_POINT).not.toContain(searchIcon);
    });

  it('should be render correct elements at "Explorar Comidas por Origem" page',
    () => {
      const { history } = renderWithRouter(<Header />);

      const END_POINT = '/explorar/comidas/area';
      history.push(END_POINT);
      const { pathname } = history.location;
      expect(pathname).toBe(END_POINT);

      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const title = screen.getByRole('heading');
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      expect(profileIcon).toBeDefined();
      expect(title).toBeDefined();
      expect(END_POINT).not.toContain(searchIcon);
    });
  it('should be render correct elements at "Explorar Receita feitas" page',
    () => {
      const { history } = renderWithRouter(<Header />);

      const END_POINT = '/receitas-feitas';
      history.push(END_POINT);
      const { pathname } = history.location;
      expect(pathname).toBe(END_POINT);

      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const title = screen.getByRole('heading');
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      expect(profileIcon).toBeDefined();
      expect(title).toBeDefined();
      expect(END_POINT).not.toContain(searchIcon);
    });
  it('should be not render header at "Explorar Receita feitas" page',
    () => {
      const { history } = renderWithRouter(<Header />);

      const END_POINT = '/comidas/:id';
      history.push(END_POINT);
      const { pathname } = history.location;
      expect(pathname).toBe(END_POINT);

      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const title = screen.getByRole('heading');
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      expect(profileIcon).not.toBeDefined();
      expect(title).not.toBeDefined();
      expect(searchIcon).not.toBeDefined();
    });
});
