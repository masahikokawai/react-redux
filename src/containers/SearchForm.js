import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { geocode } from '../domain/Geocoder'
// import { searchHotelByLocation } from '../domain/HotelRepository';
import { setPlace } from '../actions/';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit(props.place);
    }}
  >
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.onPlaceChange(e.target.value);
      }}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  place: state.place,
});
const mapDispatchToProps = dispatch => ({
  onPlaceChange: place => dispatch(setPlace(place)),
  onSubmit: (place) => {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            // this.setState({ address, location })
            // return searchHotelByLocation(location)

            dispatch({ type: 'GEOCODE_FETCHED', address, location })
            break;
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果が見つかりませんでした')
            break
          }
          case 'OVER_DAILY_LIMIT': {
            this.setErrorMessage('OVER_DAILY_LIMIT')
            break
          }
          case 'OVER_QUERY_LIMIT': {
            this.setErrorMessage('OVER_QUERY_LIMIT')
            break
          }
          case 'REQUEST_DENIED': {
            this.setErrorMessage('REQUEST_DENIED')
            break
          }
          case 'INVALID_REQUEST': {
            this.setErrorMessage('INVALID_REQUEST')
            break
          }
          case 'UNKNOWN_ERROR': {
            this.setErrorMessage('UNKNOWN_ERROR')
            break
          }
          default: {
            this.setErrorMessage('エラーが発生しました。')
          }
        }
        return []
      });
      // .then((hotels) => {
      //   this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) })
      // })
      // .catch((error) => {
      //   this.setErrorMessage('通信に失敗しました')
      // })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
