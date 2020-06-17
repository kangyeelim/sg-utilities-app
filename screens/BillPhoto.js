import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Gallery from './Gallery.js';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import { updateBill, updatePhoto } from '../redux/actions'
var { height, width } = Dimensions.get('window');

class BillPhoto extends React.Component {
  render() {
    return (
      <Text>Photo</Text>
    )
  }
}

export default withNavigation(BillPhoto)
