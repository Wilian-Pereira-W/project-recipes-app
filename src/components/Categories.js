import PropTypes from 'prop-types';
import React from 'react';

function Categories(props) {
  const { categoryName } = props;

  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
    >
      { categoryName }
    </button>
  );
}

Categories.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;

export default Categories;
