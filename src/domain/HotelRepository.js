import Rakuten from '../lib/Rakuten';

const RAKUTEN_APP_ID = 'hoge';

// eslint-disable-next-line import/prefer-export-default
export const searchHotelByLocation = (location) => {
  const params = {
    applicationId: RAKUTEN_APP_ID,
    datumType: 1,
    latitude: location.lat,
    longitude: location.lng,
  };
  return Rakuten.Travel.simpleHotelSearch(params)
    .then((result) => {
      return result.data.hotels.map((hotel) => {
        const basicInfo = hotel.hotel[0].hotelBasicInfo;
        const price = basicInfo.hotelMinCharge;
        console.log(basicInfo);
        return {
          id: basicInfo.hotelNo,
          name: basicInfo.hotelName,
          url: basicInfo.hotelInformationUrl,
          thumbUrl: basicInfo.hotelThumbnailUrl,
          price: price ? `${price}円` : '金額不明',
        };
      });
    });
};
