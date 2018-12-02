import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from '../../styles/CardComponentStyles'
import {NavImages} from '../../util/NavImages';

export class SearchItem extends React.Component {
  render() {
    return (
      <View style={styles.searchCard}><Image style={styles.searchCardIcon} source={NavImages.addLocationIcon}/><Text style={styles.searchCardText}>Add New Location</Text></View>
    );
  }
}
