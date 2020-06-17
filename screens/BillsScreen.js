import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { deleteUnsavedPhotos } from '../redux/actions'
import Gallery from './Gallery.js';

const months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];

class BillsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'All Bills',
  })

  constructor() {
    super();
    this.state = {
      deletedPhotos: false,
    }
  }

  addBill() {
    this.props.navigation.push('Bill');
  }

  async deleteAllUnsavedPhotosFromFS() {
    var arr = this.props.photos;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].saved == false) {
        await FileSystem.deleteAsync(arr[i]).catch((error) => {
          console.log(JSON.stringify(error));
        });
        console.log("deleted");
      }
    }
  }

  async componentDidMount() {
    await this.deleteAllUnsavedPhotosFromFS();
    this.props.deleteUnsavedPhotos();
    this.setState({deletedPhotos:true});
    console.log("done");
  }

  showBillPhotos(captures) {
    this.props.navigation.push('Photo', {captures:captures});
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={()=>this.addBill()}
        title="Add Bill"/>
        {this.props.bills.map((bill) => (
          <TouchableOpacity style={styles.clickable} onPress={() => this.showBillPhotos(bill.captures)}>
            <Text>{months[parseInt(bill.month) - 1]} {bill.year}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickable: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'flex-end'
  }
});

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    bills: state.bills,
  }
}

export default withNavigation(connect(mapStateToProps, { deleteUnsavedPhotos: deleteUnsavedPhotos}) (BillsScreen));
