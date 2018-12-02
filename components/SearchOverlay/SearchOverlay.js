import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Platform, Modal, SafeAreaView, Image} from 'react-native';
import {styles} from '../../styles/SearchOverlayStyles';
import WeatherData from '../../util/WeatherData';
import Timezone from '../../util/Timezone';
import {NavImages} from '../../util/NavImages';


export class SearchOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryLocation: '',
      locationResultList: [],
      attemptedSearch: false,
      isSearching: false,
      isNetworkError: false,
    }
    this._handleTextInput = this._handleTextInput.bind(this);
    this._searchQueryLocations = this._searchQueryLocations.bind(this);
    this._handleAddLocation = this._handleAddLocation.bind(this);
  }

  _handleTextInput(text) {
    this.setState({
      queryLocation: text
    })
  }

  _searchQueryLocations = async () => {
     this.setState({attemptedSearch: true, isSearching: true, isNetworkError: false});
     try {
       let queryResults = await WeatherData.searchLocation(this.state.queryLocation);
       await this.setState({
          locationResultList: queryResults,
          isSearching: false
        });
      }
      catch (error) {
        if (error.message === 'Network request failed') {
          this.setState({isSearching: false, isNetworkError: true})
        }
        console.log(error);
      }
  }

  _handleAddLocation = (location) => event => {
    this.props.addLocation({name: location.name, id: location.id, latitude: location.latitude, longitude: location.longitude});
    this.props.toggleSearch();
  }


  render() {
    return (
      <Modal transparent={true} onRequestClose={this.props.toggleSearch}>
        <View style={styles.modal}>
          <View style={styles.searchOverlayModal}>
            <SafeAreaView/>
            <View>
              <TouchableOpacity style={styles.closeModalView} onPress={this.props.toggleSearch}><Image style={styles.closeModalIcon} source={NavImages.xIcon}/></TouchableOpacity>
            </View>
            <View style={styles.searchTextInputBorder}>
              <Image style={styles.searchTextIcon} source={NavImages.magnifyingGlass}/>
              <TextInput onChangeText={this._handleTextInput} value={this.state.queryLocation} style={styles.searchTextInput} onSubmitEditing={this._searchQueryLocations}/>
            </View>
            {this.state.attemptedSearch ?
              <View style={styles.queryListView}>
                {this.state.isSearching ?
                  <Text>Searching locations...</Text> :
                  this.state.isNetworkError ?
                    <Text>Failed to connect to server...</Text> :
                    this.state.locationResultList.map(location => (
                    <TouchableOpacity key={location.id}>
                      <Text onPress={this._handleAddLocation(location)}>{location.name + ', ' + location.country}</Text>
                    </TouchableOpacity>))
                }
              </View> : null
            }
          </View>
        </View>
      </Modal>
    );
  }
}
