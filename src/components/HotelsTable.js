import React from 'react';
import PropTypes from 'prop-types';

import HotelRow from './HotelRow'

const HotelsTable = ({ hotels }) => (
  <table>
    <tr><th>ホテル名</th></tr>
    {hotels.map(hotel => (<HotelRow hotel={hotel} />))}
  </table>
);

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.any),
};

HotelsTable.defaultProps = {
  hotels: [],
};

export default HotelsTable;
