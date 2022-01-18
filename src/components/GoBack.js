import PropTypes from 'prop-types';
import React from 'react';

function GoBack({ history }) {
  return (
    <button
      type="button"
      className="btn-go-back"
      onClick={ () => history.goBack() }
    >
      ≪
    </button>
  );
}

GoBack.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default GoBack;
