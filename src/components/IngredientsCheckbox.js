import PropTypes from 'prop-types';
import React from 'react';

function IngredientsCheckbox(props) {
  const { checked, setChecked, key, ingredient, index } = props;
  return (
    <label
      htmlFor={ `${index}-ingredient-step` }
      key={ key }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        className="ingredient-step"
        id={ `${index}-ingredient-step` }
        type="checkbox"
        onChange={ () => {
          if (checked.includes(index)) {
            setChecked(checked.filter((item) => item !== index));
          } else {
            setChecked([...checked, index]);
          }
        } }
        checked={ checked.includes(index) }
      />
      <span>{`${ingredient[0]} ${ingredient[1] ? ingredient[1] : ''}`}</span>
    </label>
  );
}

IngredientsCheckbox.propTypes = {
  checked: PropTypes.shape({
    filter: PropTypes.func,
    includes: PropTypes.func,
  }).isRequired,
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.arrayOf.isRequired,
  key: PropTypes.number.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default IngredientsCheckbox;
