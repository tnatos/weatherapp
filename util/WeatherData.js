import Config from './config';

const APIKey = Config.weatherkey;
const url = 'https://api.openweathermap.org/data/2.5/';
const units = 'metric';
const type = {
  current: 'weather',
  forecast: 'forecast',
  search: 'find',
  group: 'group'
}


const WeatherData = {
  getLocationWeather: async (latitude, longitude) =>  {
    try {
    let response = await fetch(`${url}${type.current}?lat=${latitude}&lon=${longitude}&units=${units}&APPID=${APIKey}`)
      if (response.ok) {
        let location = await response.json();
        return {
          id: location.id,
          name: location.name,
          temp: Math.round(location.main.temp),
          temp_min: location.main.temp_min,
          temp_max: location.main.temp_max,
          humidity: location.main.humidity,
          wind: location.wind.speed,
          sunrise: location.sys.sunrise,
          sunset: location.sys.sunset,
          conditions: location.weather[0],
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  },
  // returns an object with relevant data
  getWeather: async (locationIDs) => {
    try {
      let response = await fetch(`${url}${type.group}?id=${locationIDs.toString()}&units=${units}&APPID=${APIKey}`)
      if (response.ok) {
        let responseJson = await response.json();
        let locationWeatherData = responseJson.list.map(location => { return {
            id: location.id,
            name: location.name,
            temp: Math.round(location.main.temp),
            temp_min: location.main.temp_min,
            temp_max: location.main.temp_max,
            humidity: location.main.humidity,
            wind: location.wind.speed,
            sunrise: location.sys.sunrise,
            sunset: location.sys.sunset,
            conditions: location.weather[0],
            country: location.sys.country
          }});
        return locationWeatherData;
      }
    }
    catch (error) {
      console.log(error.message);
    }

  },

    searchLocation: async (locationString) => {
      try {
        let response = await fetch(`${url}${type.search}?q=${locationString}&APPID=${APIKey}`);
        if (response.ok) {
          let responseJson = await response.json();
          return responseJson.list.map(location => {
            return {
              id: location.id,
              name: location.name,
              country: location.sys.country,
              latitude: location.coord.lat,
              longitude: location.coord.lon
            };
          });
        }
      }
      catch (error) {
        console.log(error);
        if (error.message === 'Network request failed') {
          throw error;
        }
      }
    }

    // getWeather(locationIDs) {
    //   return fetch(`${url}${type.group}?id=${locationIDs.toString()}&units=${units}&APPID=${APIKey}`)
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json()
    //     }})
    //   .then((responseJson) => {
    //     let locationWeatherData = [];
    //     if (responseJson.cod !== 400) {
    //     locationWeatherData = responseJson.list.map( location => {return {
    //         id: location.id,
    //         name: location.name,
    //         temp: Math.round(location.main.temp),
    //         temp_min: location.main.temp_min,
    //         temp_max: location.main.temp_max,
    //         humidity: location.main.humidity,
    //         wind: location.wind.speed,
    //         sunrise: location.sys.sunrise,
    //         sunset: location.sys.sunset,
    //         conditions: location.weather[0],
    //         country: location.sys.country
    //       }});
    //     }
    //     return locationWeatherData;
    //   });
    //   }

  // returns array of locations
  // searchLocation(locationString) {
  //   return fetch(`${url}${type.search}?q=${locationString}&APPID=${APIKey}`)
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json()
  //     }})
  //   .then((responseJson) => {
  //     // response is an object with an array with list as the key
  //     return responseJson.list.map(location => {
  //       return {
  //         id: location.id,
  //         name: location.name,
  //         country: location.sys.country,
  //         latitude: location.coord.lat,
  //         longitude: location.coord.lon
  //       };
  //     });
  //   })
  // }
}


export default WeatherData;
