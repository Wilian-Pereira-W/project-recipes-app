import axios from 'axios';

export const foodsAPI = axios.create({
  baseURL: 'www.themealdb.com/api/json/v1/1/',
});

export const drinksAPI = axios.create({
  baseURL: 'www.thecocktaildb.com/api/json/v1/1/',
});
