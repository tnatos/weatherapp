import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getWeatherIcon, getWeatherDescription} from './WeatherItemHelper';
import { styles } from '../../styles/CardComponentStyles'

export class WeatherItemCard extends React.Component {
  // if no data then render with "default" values.

  render () {
      return (
        <View style={{...styles.card, ...this.props.backgroundColor}}>
        <View style={styles.cardLeft}>
          <View>
          <Text style={{...styles.locationNameText, ...styles.proximaNovaSemibold}}>{this.props.location.name ? this.props.location.name : this.props.locationWeather.name}</Text>
          <Text style={{...styles.conditionText, ...styles.proximaNovaThin}}>{getWeatherDescription(this.props.locationWeather.conditions.id)}</Text>
          </View>
          <View>
          <Text style={{...styles.timeText, ...styles.proximaNovaThin}}>{this.props.currentTime}</Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Image style={styles.weatherIcon} source={getWeatherIcon(this.props.locationWeather.conditions.id)}/>
          <View style={styles.temperatureView}>
            <Text style={{...styles.temperatureText, ...styles.proximaNovaThin}}>{this.props.locationWeather.temp}</Text>
            <Text style={{...styles.temperatureUnitText, ...styles.proximaNovaThin}}>°C</Text>
          </View>
        </View>
        </View>
      );

  }
}
