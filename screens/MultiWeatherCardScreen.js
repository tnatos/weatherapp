import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {WeatherItemList} from '../components/WeatherItemList/WeatherItemList';
import {SearchItem} from '../components/SearchItem/SearchItem';
import {SearchOverlay} from '../components/SearchOverlay/SearchOverlay';


export class MultiWeatherCardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchVisible: false,
    }
    this._toggleSearch = this._toggleSearch.bind(this);
  }

  _toggleSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#EEE'}}>
          <WeatherItemList currentLocation={this.props.currentLocation}
          currentLocationWeather={this.props.currentLocationWeather}
          locationList={this.props.locationList}
          locationListWeather={this.props.locationListWeather}
          removeLocation={this.props.removeLocation}
          currentTime={this.props.currentTime}/>
          <TouchableOpacity onPress={this._toggleSearch}><SearchItem/></TouchableOpacity>
        </ScrollView>
        {this.state.searchVisible ? <SearchOverlay toggleSearch={this._toggleSearch} addLocation={this.props.addLocation}/> : null}
      </View>
    );
  }
}
