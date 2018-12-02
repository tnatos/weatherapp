import Config from './config'

const APIKey = Config.timezonekey;
const url = 'https://api.timezonedb.com/v2.1/get-time-zone?key=';
const format = {json: 'json', xml: 'xml'};
const by = {position: 'position'};

const Timezone = {
  getTimezone: async (latitude, longitude) => {
    let response = await fetch(`${url}${APIKey}&format=${format.json}&by=${by.position}&lat=${latitude}&lng=${longitude}`)
    if (response.ok) {
      try {
        let responseJson = await response.json();
        let timezone = {
          timezoneName: responseJson.zoneName,
          timezoneOffset: responseJson.gmtOffset,
          daylightSavings: responseJson.dst
        };
        return timezone;
      }
      catch (error) {
        console.log(error);
      }
    }
  },
}

export default Timezone;
