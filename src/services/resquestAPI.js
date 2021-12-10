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
