import React from 'react';
import PropTypes from 'prop-types';

const SearchFrom = props => (
  <form className="search-form" onSubmit={e => props.onSubmit(e)}>
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={e => props.onPlaceChange(e)}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchFrom.propTypes = {
  place: PropTypes.string.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchFrom;
