import React, { PropTypes } from 'react';

const GeocodeResult = ({ address, lat, lng }) => (
  <ul className="geocode-result">
    <li>住所：{address}</li>
    <li>緯度：{lat}</li>
    <li>経度：{lng}</li>
  </ul>
);

GeocodeResult.propTypes = {
  address: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

GeocodeResult.defaultProps = {
  address: '',
};

export default GeocodeResult;
