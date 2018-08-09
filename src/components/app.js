import React, { Component } from 'react'
import _ from 'lodash';

import SearchForm from './SearchForm'
import GeocodeResult from './GeocodeResult'
import Map from './Map'
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder'
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      sortKey: 'price',
    };
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

  render () {
    return (
      <div className="app">
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
            <HotelsTable hotels={this.state.hotels} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
