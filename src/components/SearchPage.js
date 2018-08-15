import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder'
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor (props) {
    console.log(props);
    console.log('constructor');
    super(props)
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      sortKey: 'price',
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillRecieveProps() {
    console.log('componentWillRecieveProps');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  setErrorMessage (message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0
      }
    })
  }

  handlePlaceSubmit (place) {
    this.props.history.push(`/?query=${place}`);
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location })
            return searchHotelByLocation(location)
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
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) })
      })
      .catch((error) => {
        this.setErrorMessage('通信に失敗しました')
      })
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey)
    });
  }

  render () {
    console.log('render');
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <
              HotelsTable hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default SearchPage;
