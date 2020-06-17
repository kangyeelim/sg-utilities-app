import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { deleteUnsavedPhotos, deleteBill, deletePhoto } from '../redux/actions'
import Gallery from './Gallery.js';
import { AntDesign } from '@expo/vector-icons';

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
        this.props.deletePhoto(arr[i]);
      }
    }
  }

  async componentDidMount() {
    await this.deleteAllUnsavedPhotosFromFS();
    this.props.deleteUnsavedPhotos();
    this.setState({deletedPhotos:true});
  }

  showBillPhotos(captures, year, month) {
    this.props.navigation.push('Photo', {captures:captures, year:year, month:month});
  }

  editBill(bill) {
    this.props.navigation.push('Bill', {month:bill.month, year:bill.year, captures:bill.captures, editing:true});
  }

  async deleteBill(bill) {
    this.props.deleteBill(bill);
    for (var i = 0; i < bill.captures.length; i++) {
      await FileSystem.deleteAsync(bill.captures[i]).catch((error) => {
        console.log(JSON.stringify(error));
      });
      this.props.deletePhoto(bill.captures[i]);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity style={{alignItems:'center'}}onPress={()=>this.addBill()}>
            <AntDesign name="pluscircleo" size={30} color="black" />
            <Text>Add Bill</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          <FlatList contentContainerStyle={{padding: 20}}
            data={this.props.bills.sort(function(a,b) {
                a = parseInt(a.year) + parseInt(a.month);
                b = parseInt(b.year) + parseInt(b.month);
                return a > b ? 1 : a < b ? -1 : 0;
              // return a.localeCompare(b);         // <-- alternative
              })}
            renderItem={({ item }) => (
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{alignSelf:'center', marginRight:20}} onPress={() => this.editBill(item)}>
                <AntDesign name="edit" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.clickable} onPress={() => this.showBillPhotos(item.captures, item.year, months[parseInt(item.month) - 1])}>
                <Text>{months[parseInt(item.month) - 1]} {item.year}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 20, alignSelf:'center'}} onPress={() => this.deleteBill(item)}>
                <AntDesign name="delete" size={20} color="black" />
              </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.year + item.month + item.captures[0]}
          />
        </SafeAreaView>
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
    shadowOffset: { height: 3, width: 3 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 5, //IOS
    backgroundColor: '#0000',
    elevation: 2, // Android
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.1,
    borderRadius: 5
  },
  scrollable: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'flex-end',
    margin: 20,
  }
});

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    bills: state.bills,
  }
}

export default withNavigation(connect(mapStateToProps, { deleteUnsavedPhotos: deleteUnsavedPhotos, deleteBill:deleteBill, deletePhoto:deletePhoto}) (BillsScreen));
