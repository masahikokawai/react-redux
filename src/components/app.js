import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  setErrorMessage(message) {
    this.setState({
      address: message,
      lat: 0,
      lng: 0,
    });
  }

  handlePlaceSubmit(place) {
    console.log(place);
    axios
      .get(GEOCODE_ENDPOINT, { params: { address: place } })
      .then((results) => {
        console.log(results);
        const data = results.data;
        const result = data.results[0];
        switch (data.status) {
          case 'OK': {
            const location = result.geometry.location;
            this.setState({
              address: result.formatted_address,
              lat: location.lat,
              lng: location.lng,
            });
            break;
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          case 'OVER_DAILY_LIMIT': {
            this.setErrorMessage('OVER_DAILY_LIMIT');
            break;
          }
          case 'OVER_QUERY_LIMIT': {
            this.setErrorMessage('OVER_QUERY_LIMIT');
            break;
          }
          case 'REQUEST_DENIED': {
            this.setErrorMessage('REQUEST_DENIED');
            break;
          }
          case 'INVALID_REQUEST': {
            this.setErrorMessage('INVALID_REQUEST');
            break;
          }
          case 'UNKNOWN_ERROR': {
            this.setErrorMessage('UNKNOWN_ERROR');
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error)
        this.setErrorMessage('通信に失敗しました');
      });
  }

  render() {
    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult
          address={this.state.address}
          lat={this.state.lat}
          lng={this.state.lng}
        />
      </div>
    );
  }
}

export default App;
