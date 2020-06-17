import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { deleteUnsavedPhotos } from '../redux/actions'
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
        <View style={styles.button}>
          <TouchableOpacity style={{alignItems:'center'}}onPress={()=>this.addBill()}>
            <AntDesign name="pluscircleo" size={30} color="black" />
            <Text>Add Bill</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          <FlatList contentContainerStyle={{padding: 20}}
            data={this.props.bills}
            renderItem={({ item }) => (

              <TouchableOpacity style={styles.clickable} onPress={() => this.showBillPhotos(item.captures)}>
                <Text>{months[parseInt(item.month) - 1]} {item.year}</Text>
              </TouchableOpacity>
              
            )}
            keyExtractor={item => item.year + item.month}
          />
        </SafeAreaView>
      </View>
    );
  }
}

/*{this.props.bills.map((bill) => (

  <TouchableOpacity style={styles.clickable} onPress={() => this.showBillPhotos(bill.captures)}>
    <Text>{months[parseInt(bill.month) - 1]} {bill.year}</Text>
  </TouchableOpacity>

))}*/

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
    borderWidth: 0.05,
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

export default withNavigation(connect(mapStateToProps, { deleteUnsavedPhotos: deleteUnsavedPhotos}) (BillsScreen));
