import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, SafeAreaView, AsyncStorage, Image, AppState} from 'react-native';
import {MultiWeatherCardScreen} from './screens/MultiWeatherCardScreen';
import WeatherData from './util/WeatherData';
import Timezone from './util/Timezone';

let interval = 1000;
let expected = '';
let timer = null;
let getLocation = null;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      firstLaunch: null,
      currentLocation: null,
      currentLocationWeather: null,
      locationList: [],
      locationListWeather: [],
      viewMode: 'multi',
      isLoading: true,
      currentTime: Math.floor(Date.now()/60000) * 60000,
    }
    this._addLocation = this._addLocation.bind(this);
    this._removeLocation = this._removeLocation.bind(this);
    this._initializeTimer = this._initializeTimer.bind(this);
    this._step = this._step.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  _checkFirstLaunch = async () => {
    AsyncStorage.getItem("alreadyLaunched").then(async (value) => {
      if (value === null) {
        this._initializeSettings();
      }
      else {
        this._loadSettings();
      }
      this.setState({
        isLoading: false,
      });
    })
  }


  _initializeTimer() {
    // expected time is the second after current time;
    expected = Math.floor(Date.now() / 1000) * 1000 + interval;
    timer = setTimeout(this._step, interval);
  }

  _step() {
    let dt = Date.now() - expected;
      if (dt > interval) {
        // time drifted, since dt is greater than the next expected time.
        expected = Math.floor(Date.now() / 1000) * 1000 + interval;
      }
      else {
        expected += interval;
      }
      if (this.state.currentTime < Math.floor(Date.now()/60000) * 60000) {
        this._updateTime();
        this._getLocationListWeather();
      }
      timer = setTimeout(this._step, Math.max(0, interval - dt));
  }

  _updateTime() {
    this.setState({
      currentTime: Math.floor(Date.now()/60000) * 60000
    })
  }

  _addLocation = async (location) => {
    let locationIDs = [];
    this.state.locationList.forEach(location => {
      locationIDs.push(location.id);
    });
    if (!locationIDs.includes(location.id)) {
      let newLocationList = this.state.locationList.slice();
      let locationTimezone = await Timezone.getTimezone(location.latitude, location.longitude);
      location.timezoneName = locationTimezone.timezoneName;
      location.timezoneOffset = locationTimezone.timezoneOffset;
      location.daylightSavings = locationTimezone.daylightSavings;
      newLocationList.push(location);
      await this.setState({
        locationList: newLocationList
      });
      this._saveSettings('locationList', this.state.locationList);
    }
  }

  _removeLocation = async (location) => {
    if (this.state.locationList.includes(location)) {
      let newLocationList = this.state.locationList.slice();
      newLocationList.splice(newLocationList.indexOf(location), 1);
      await this.setState({
        locationList: newLocationList
      });
      this._saveSettings('locationList', this.state.locationList);
    }
  }

  _saveSettings = async (key, value) => {
    let valueString = value;
    if ((typeof value) !== 'string') {
      valueString = JSON.stringify(value);
    }
    return await AsyncStorage.setItem(key, valueString);
  }

  _initializeSettings = async () => {
    return await AsyncStorage.multiSet([['alreadyLaunched', 'false'], ['locationList', JSON.stringify([])], ['viewMode', 'multi']]);
    this.setState({firstLaunch: false, locationList: [], viewMode: 'multi'})
  }

  _loadSettings = async () => {
    return await AsyncStorage.multiGet(['locationList', 'viewMode'], (err, stores) => {
      this.setState({
        firstLaunch: false,
        locationList: JSON.parse(stores[0][1]),
        viewMode: stores[0][1]
      })
    });
  }

  _updateLocationWeather = async (position) => {
    let tz = await Timezone.getTimezone(position.coords.latitude, position.coords.longitude);
    await this.setState({
      currentLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timezoneName: tz.timezoneName,
        timezoneOffset: tz.timezoneOffset,
        daylightSavings: tz.daylightSavings
      }
    });
      let latitude = this.state.currentLocation.latitude;
      let longitude = this.state.currentLocation.longitude;
      let currentWeather = await WeatherData.getLocationWeather(latitude, longitude);
      this.setState({currentLocationWeather: currentWeather});
      navigator.geolocation.clearWatch(getLocation);
  }
  _handleGetCurrentLocationError(error) {
    console.log(error);
  }
  _getCurrentLocationWeather = async () => {
    getLocation = await navigator.geolocation.watchPosition(this._updateLocationWeather, this._handleGetCurrentLocationError,
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  _getLocationListWeather = async () => {
    let idList = [];
    if (this.state.locationList.length > 0) {
      idList = this.state.locationList.map(location => location.id);
      return await WeatherData.getWeather(idList).then((weatherData) => {
        this.setState({locationListWeather: weatherData});
      });
    }
  }

  _handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this._getCurrentLocationWeather();
      this._getLocationListWeather();
    }
    this.setState({appState: nextAppState});
  }

  componentDidMount() {
    this._checkFirstLaunch();
    this._getCurrentLocationWeather();
    this._initializeTimer();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.locationList && this.state.locationList !== prevState.locationList) {
      this._getLocationListWeather();
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <SafeAreaView/>
          <View style={{alignItems: 'center', paddingTop: '2%', paddingBottom: '2%', backgroundColor: '#fff'}}>
            <Image style={{height: 40,width: 50}} source={require('./assets/logo.png')}/>
          </View>
          <MultiWeatherCardScreen currentLocation={this.state.currentLocation}
          currentLocationWeather={this.state.currentLocationWeather}
          locationList={this.state.locationList}
          locationListWeather={this.state.locationListWeather}
          addLocation={this._addLocation} removeLocation={this._removeLocation}
          currentTime={this.state.currentTime}/>
          <View style={{alignItems: 'center', height: 50, backgroundColor: '#fff'}}></View>
        </View>
      );
    }
    else {
      return (<View style={styles.container}><Text>Loading</Text></View>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
});
