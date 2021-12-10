import axios from 'axios';

export const foodsAPI = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
});

export const drinksAPI = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});
