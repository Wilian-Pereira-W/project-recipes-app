import PropTypes from 'prop-types';
import React from 'react';

function Categories(props) {
  const { categoryName } = props;

  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
    >
      { categoryName.split(' ')[0].split('/')[0] }
    </button>
  );
}

Categories.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;

export default Categories;
