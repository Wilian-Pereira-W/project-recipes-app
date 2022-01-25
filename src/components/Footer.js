import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/footer.css';
import drinkIcon from '../images/drinkIconYellow.svg';
import exploreIcon from '../images/exploreIconYellow.svg';
import mealIcon from '../images/mealIconYellow.svg';
import { DrinkRecipesContext } from '../context/RecipesContext';

function Footer() {
  const { setIsLoading } = useContext(DrinkRecipesContext);
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          setIsLoading(true);
          history.push('/bebidas');
        } }
        src={ drinkIcon }
        alt="Ícone de Bebidas"
      />
      <input
        type="image"
        data-testid="explore-bottom-btn"
        onClick={ () => {
          setIsLoading(true);
          history.push('/explorar');
        } }
        src={ exploreIcon }
        alt="Ícone de Explorar"
      />

      <input
        type="image"
        data-testid="food-bottom-btn"
        onClick={ () => {
          setIsLoading(true);
          history.push('/comidas');
        } }
        src={ mealIcon }
        alt="Ícone de Comidas"
      />
    </footer>
  );
}

export default Footer;
