export const foodsAPI = async (queryString) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${queryString}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const drinksAPI = async (queryString) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${queryString}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const ingredientsAPI = async (queryString) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${queryString}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const nameAPI = async (queryString) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryString}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const firstLetterAPI = async (queryString) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${queryString}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
