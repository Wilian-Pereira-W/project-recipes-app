import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Header from '../components/Header';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreFoodsByLocale from '../pages/ExploreFoodsByLocale';
import Profile from '../pages/Profile';
import FinishedRecipes from '../pages/FinishedRecipes';
import Favorites from '../pages/Favorites';

describe('Testing header component', () => {
  const SEARCH_INPUT = 'search-input';
  it('should be render profileIcon', () => {
    renderWithRouter(<Header />);

    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    expect(profileIcon).toBeDefined();
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

  it('should be render correct elements at "Comidas" page', () => {
    renderWithRouter(<Foods />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(SEARCH_INPUT);
    expect(searchBar).toBeDefined();
    userEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
    expect(searchIcon).toBeDefined();
    expect(title.innerHTML).toBe('Comidas');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Bebidas" page', () => {
    renderWithRouter(<Drinks />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.getByAltText(/Ícone de procurar/i);
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(SEARCH_INPUT);
    expect(searchBar).toBeDefined();
    userEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
    expect(searchIcon).toBeDefined();
    expect(title.innerHTML).toBe('Bebidas');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Explorar" page', () => {
    renderWithRouter(<Explore />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
    expect(searchIcon).not.toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Perfil" page', () => {
    renderWithRouter(<Profile />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
    expect(searchIcon).not.toBeInTheDocument();
    expect(title.innerHTML).toBe('Perfil');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Receitas Favoritas" page', () => {
    renderWithRouter(<Favorites />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
    expect(searchIcon).not.toBeInTheDocument();
    expect(title.innerHTML).toBe('Receitas Favoritas');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Explorar Bebidas" page', () => {
    renderWithRouter(<ExploreDrinks />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
    expect(searchIcon).not.toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Bebidas');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Explorar Comidas" page', () => {
    renderWithRouter(<ExploreFoods />);
    const title = screen.getByRole('heading', {
      leve: 1,
    });
    const profileIcon = screen.getByAltText(/Ícone do perfil/i);
    const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
    expect(searchIcon).not.toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Comidas');
    expect(profileIcon).toBeDefined();
  });

  it('should be render correct elements at "Explorar Comidas por ingredientes" page',
    () => {
      renderWithRouter(<ExploreFoodIngredients />);
      const title = screen.getByRole('heading', {
        leve: 1,
      });
      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
      expect(searchIcon).not.toBeInTheDocument();
      expect(title.innerHTML).toBe('Explorar Ingredientes');
      expect(profileIcon).toBeDefined();
    });
  it('should be render correct elements at "Explorar Bebidas por ingredientes" page',
    () => {
      renderWithRouter(<ExploreDrinkIngredients />);
      const title = screen.getByRole('heading', {
        leve: 1,
      });
      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
      expect(searchIcon).not.toBeInTheDocument();
      expect(title.innerHTML).toBe('Explorar Ingredientes');
      expect(profileIcon).toBeDefined();
    });
  it('should be render correct elements at "Explorar Bebidas por Origem" page',
    () => {
      renderWithRouter(<ExploreFoodsByLocale />);
      const title = screen.getByRole('heading', {
        name: 'Explorar Origem',
        leve: 1,
      });
      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const searchIcon = screen.getByAltText(/Ícone de procurar/i);
      userEvent.click(searchIcon);
      const searchBar = screen.getByTestId(SEARCH_INPUT);
      expect(searchBar).toBeDefined();
      userEvent.click(searchIcon);
      expect(searchBar).not.toBeInTheDocument();
      expect(searchIcon).toBeDefined();
      expect(title.innerHTML).toBe('Explorar Origem');
      expect(profileIcon).toBeDefined();
    });

  it('should be render correct elements at "Receita-feitas" page',
    () => {
      renderWithRouter(<FinishedRecipes />);
      const title = screen.getByRole('heading', {
        leve: 1,
      });
      const profileIcon = screen.getByAltText(/Ícone do perfil/i);
      const searchIcon = screen.queryByAltText(/Ícone de procurar/i);
      expect(searchIcon).not.toBeInTheDocument();
      expect(title.innerHTML).toBe('Receitas Feitas');
      expect(profileIcon).toBeDefined();
    });
});
