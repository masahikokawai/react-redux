import React from 'react';
import PropTypes from 'prop-types';

const HotelRow = ({ hotel }) => (
  <tr>
    <td>{hotel.name}</td>
  </tr>
);

HotelRow.propTypes = {
  hotel: PropTypes.shape({
  	name: PropTypes.string,
  }).isRequired,
};

export default HotelRow;
