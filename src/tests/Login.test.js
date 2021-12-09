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
});
