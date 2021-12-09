import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import LoginProvider from '../context/LoginProvider';
import App from '../App';

const CORRECT_EMAIL = 'teste@trybe.com';
const INCORRECT_EMAIL = 'testetrybe.com';
const CORRECT_PASSWORD = 'trybe2021';
const INCORRECT_PASSWORD = 'trybe';
const TOKEN_NUMBER = '1';

describe('Testing Login Page', () => {
  it('should be a login input in the document', () => {
    renderWithRouter(
      <LoginProvider>
        <App />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    expect(emailInput).toBeDefined();
  });
  it('should be a password input in the document', () => {
    renderWithRouter(
      <LoginProvider>
        <App />
      </LoginProvider>,
    );

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeDefined();
  });

  it('should be a valid email and password to enable enter button', () => {
    renderWithRouter(
      <LoginProvider>
        <App />
      </LoginProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/entrar/i);
    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(passwordInput, CORRECT_PASSWORD);
    expect(submitButton).toBeDefined();
    expect(submitButton.disabled).toBe(false);
  });
});
