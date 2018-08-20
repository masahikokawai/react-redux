import { geocode } from '../domain/Geocoder'
// import { searchHotelByLocation } from '../domain/HotelRepository';

export const setPlace = place => dispatch => dispatch({ type: 'CHANGE_PLACE', place });

export const startSearch = () => (dispatch, getState) => {
  geocode(getState().place)
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
};
