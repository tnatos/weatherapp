import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {WeatherItem} from '../WeatherItem/WeatherItem';

export class WeatherItemList extends React.Component {
  render() {
    return (
      <View>
        <WeatherItem location={this.props.currentLocation} locationWeather={this.props.currentLocationWeather} currentTime={this.props.currentTime}/>
        {this.props.locationList ?
          this.props.locationList.map((loc, i) => <TouchableOpacity key={loc.id} onPress={() => {this.props.removeLocation(loc)}}><WeatherItem location={loc} locationWeather={this.props.locationListWeather ? this.props.locationListWeather[i] : undefined} currentTime={this.props.currentTime}/></TouchableOpacity>) :
          null}
      </View>
    );
  }
}
