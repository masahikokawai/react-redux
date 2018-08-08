import React, { Component } from 'react'

import SearchForm from './SearchForm'
import GeocodeResult from './GeocodeResult'
import Map from './Map'
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      hotels: [
        { id: 111, name: 'ホテルオークラ', url: 'https://google.com' },
        { id: 222, name: 'プリンスホテル', url: 'https://yahoo.co.jp' },
      ],
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
    console.log(place)
    geocode(place)
      .then(({ status, address, location }) => {
        console.log(status)
        console.log(address)
        console.log(location)
        switch (status) {
          case 'OK': {
            this.setState({ address, location })
            break
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
        }
      })
      .catch((error) => {
        console.log(error)
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
