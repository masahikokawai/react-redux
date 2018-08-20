export default (state= { place: '東京タワー' }, action) => {
  console.log('action', action);
  switch (action.type) {
  	case 'CHANGE_PLACE':
  	  return Object.assign({}, state, {place: action.place});
  	 default:
      return state;
  }
};
