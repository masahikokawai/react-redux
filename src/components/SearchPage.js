import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from '../containers/SearchForm';
// import GeocodeResult from './GeocodeResult';
// import Map from './Map';
// import HotelsTable from './HotelsTable';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sortKey: 'price',
    };
  }

  componentDidMount() {
    { /* const place = this.getPlaceParam();
    if (place) {
      this.startSearch(place);
    } */ }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place) {
      return place;
    }
    return null;
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

  handlePlaceSubmit (e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey)
    });
  }

  render () {
    console.log(this.props);
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        { /*
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
      */ }
      </div>
    )
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ push: PropTypes.string }).isRequired,
};

export default SearchPage;
