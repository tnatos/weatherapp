// icons for drizzle conditions defined by API
const drizzle = {
  300: 500,
  301: 501,
  302: 502,
  310: 500,
  311: 501,
  312: 502,
  313: 501,
  314: 502,
  321: 501,
}
// icons for rainy conditions defined by API
const rain = {
  500: 500,
  501: 501,
  502: 502,
  503: 502,
  504: 502,
  511: 501,
  520: 500,
  521: 501,
  522: 502,
  531: 501
}

const weatherIcons = {
  200: require('../../assets/thunderstorms.png'),
  500: require('../../assets/light-rain.png'),
  501: require('../../assets/moderate-rain.png'),
  502: require('../../assets/heavy-rain.png'),
  800: require('../../assets/clear.png'),
  801: require('../../assets/partly-cloudy.png'),
  802: require('../../assets/cloudy.png'),
  804: require('../../assets/overcast.png'),
}

const weatherDescriptions = {
  200: 'THUNDERSTORMS',
  500: 'LIGHT RAIN',
  501: 'RAIN',
  502: 'HEAVY SHOWERS',
  800: 'CLEAR SKIES',
  801: 'PARTLY CLOUDY',
  802: 'CLOUDY',
  804: 'OVERCAST',
}

export function getWeatherDescription(conditionId) {
  let id = conditionId;
  switch (Math.round(conditionId / 100)) {
    case 2:
      id = 200;
      break;
    case 3:
      id = drizzle[conditionId]
      break;
    case 5:
      id = rain[conditionId]
      break;
  }
  if (conditionId == 803) {
    id = 804;
  }
  let descriptionToReturn = weatherDescriptions[id];
  if (descriptionToReturn === undefined) {
    return weatherDescriptions[800];
  }
  else {
    return descriptionToReturn;
  }
}

export function getWeatherIcon(conditionId) {
  let id = conditionId;
  switch (Math.floor(conditionId / 100)) {
    case 2:
      id = 200;
      break;
    case 3:
      id = drizzle[conditionId]
      break;
    case 5:
      id = rain[conditionId]
      break;
  }
  if (conditionId == 803) {
    id = 804;
  }
  let iconToReturn = weatherIcons[id];
  if (iconToReturn === undefined) {
    return weatherIcons[800];
  }
  else {
    return iconToReturn;
  }
}

export function isCloudy(conditionId) {
  let id = Math.round(conditionId / 100);
  if (id === 3 || id === 5 || conditionId > 800) {
    return true;
  }
  else {
    return false;
  }
}
