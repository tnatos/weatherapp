import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getWeatherIcon, isCloudy } from './WeatherItemHelper';
import { WeatherItemCard } from './WeatherItemCard';
import { styles } from '../../styles/CardComponentStyles'

const msPerDay = 86400000;
const msPerSec = 1000;
const msPerMin = 60000;
const msPerHour = 3600000;

export class WeatherItem extends React.Component {
  // if no data then render with "default" values.
  constructor(props) {
    super(props);
    this.state = {
      locationWeather: {
        name: '',
        conditions: {
          description: '',
          id: 800
        },
        temp: '',
      }
    }
  }

  _calculateLocalTime() {

    let timeElapsedToday = this.props.currentTime;
    if (this.props.location) {
      timeElapsedToday = (timeElapsedToday + (this.props.location.timezoneOffset * msPerSec)) % msPerDay ;
    }
    else {
      timeElapsedToday = timeElapsedToday % msPerDay;
    }
    let hours = Math.floor(timeElapsedToday / msPerHour);
    let minutes = Math.floor((timeElapsedToday % msPerHour) / msPerMin);
    let time = {
      hours: hours,
      minutes: minutes,
      currentLocalTime: timeElapsedToday
    }
    return time;
  }

  _getBackgroundColor() {
    const currentTime = this.props.currentTime / msPerSec;
    let sunrise = 21600000;
    let sunset = 64800000;
    let cloudy = false;
    if (this.props.locationWeather) {
      sunrise = this.props.locationWeather.sunrise;
      sunset = this.props.locationWeather.sunset;
      cloudy = isCloudy(this.props.locationWeather.conditions.id);
    }
    if (currentTime > sunrise && currentTime < sunset) {
      if (cloudy) {
        return styles.cardColorCloudy;
      }
      else {
        return styles.cardColorDay;
      }
    }
    else {
      return styles.cardColorNight;
    }

  }

  _getDateString() {
      let localTime = this._calculateLocalTime();
      let hours = localTime.hours;
      let minutes = localTime.minutes;
      let timeString = "";

      if (minutes < 10) {
        minutes = "0" + minutes
      }
      if (hours === 0) {
        timeString = '12' + ':' + minutes + 'AM';
      }
      else if (hours < 12) {
        timeString = hours + ':' + minutes + 'AM';
      }
      else if (hours === 12) {
        timeString = hours + ':' + minutes + 'PM';
      }
      else if (hours === 24) {
        timeString = (hours - 12) + ':' + minutes + 'AM';
      }
      else {
        timeString = (hours - 12) + ':' + minutes + 'PM';
      }
      return timeString;
  }

  render () {
      return <WeatherItemCard location={this.props.location ? this.props.location : this.state.locationWeather}
      locationWeather={this.props.locationWeather ? this.props.locationWeather : this.state.locationWeather}
      currentTime={this._getDateString()} backgroundColor={this._getBackgroundColor()}/>
  }
}
