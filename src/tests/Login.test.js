import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import LoginProvider from '../context/LoginProvider';
import Login from '../pages/Login';

const CORRECT_EMAIL = 'teste@trybe.com';
const INCORRECT_EMAIL = 'testetrybe.com';
const CORRECT_PASSWORD = 'trybe2021';
const INCORRECT_PASSWORD = 'trybe';
const TOKEN_NUMBER = '1';

describe('Testing Login Page', () => {
  it('should be a login input in the document', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    expect(emailInput).toBeDefined();
  });
  it('should be a password input in the document', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeDefined();
  });

  it('should be a submit button("Entrar") in the document', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const submitButton = screen.getByText(/entrar/i);
    expect(submitButton).toBeDefined();
  });

  it('should be a valid email and password to enable enter button', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/entrar/i);
    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    expect(submitButton.disabled).toBe(false);
  });

  it('should be a invalid email and password to disable enter button', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/entrar/i);
    userEvent.type(emailInput, INCORRECT_EMAIL);
    userEvent.type(passwordInput, INCORRECT_PASSWORD);
    expect(submitButton.disabled).toBe(true);
  });

  it('should be save tokens at localStorage', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/entrar/i);
    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    userEvent.click(submitButton);
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe(TOKEN_NUMBER);
    expect(cocktailsToken).toBe(TOKEN_NUMBER);
  });
  it('should be save user at localStorage', () => {
    renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/entrar/i);
    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    userEvent.click(submitButton);
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: CORRECT_EMAIL });
  });

  it('should be redirect to food page', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/entrar/i);
    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    userEvent.click(submitButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
