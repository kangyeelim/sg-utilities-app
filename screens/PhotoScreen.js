import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Gallery from './Gallery.js';
import * as FileSystem from 'expo-file-system';

var { height, width } = Dimensions.get('window');

class PhotoScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
  })

  constructor() {
    super();
    this.state = {
      year: 0,
      month: 0,
      checkedForProps: false,
      captures: [],
    };
  }

  checkProps() {
    if (this.props.navigation.getParam('year') != null && this.props.navigation.getParam('month') != null &&
    this.props.navigation.getParam('captures') != null) {
      this.setState({year:this.props.navigation.getParam('year')});
      this.setState({month:this.props.navigation.getParam('month')});
      this.setState({captures:this.props.navigation.getParam('captures')});
    }
    this.setState({checkedForProps:true});
    console.log("checkedForProps");
  }

  componentDidMount() {
    this.checkProps();
  }

  setYear(year) {
    this.setState({year:year});
  }

  setMonth(month) {
    this.setState({month:month});
  }

  takePhoto() {
    this.props.navigation.navigate('Camera', {year:this.state.year, month:this.state.month, captures:this.state.captures});
  }

  saveBill() {
    //save into redux store
    if (+this.state.month > 0 && +this.state.year > 0 && this.state.captures.length > 0) {
      this.props.navigation.push('BillsScreen');
    }
  }

  handleDeletePhoto = async (uri) => {
    await FileSystem.deleteAsync(uri).catch((error) => {
      console.log(JSON.stringify(error));
    });
    this.removeUriFromCaptures(uri);
  };

  removeUriFromCaptures(uri) {
    var newCaptures = this.state.captures.filter( function (value, index, arr) {
      return value !== uri;
    });
    this.setState({captures:newCaptures});
  }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
      <View style={styles.container}>

        <Text style={styles.text}>Year (YYYY):</Text>
        { this.state.checkedForProps && (<TextInput
					style={styles.input}
					placeholder="Year"
					onChangeText={reading => this.setYear(reading)}
					defaultValue={this.state.year}
					ref={input => { this.yearInput = input }}
          keyboardType="numeric"
				/>)}
        <Text style={styles.text}>Month (MM):</Text>
        { this.state.checkedForProps && (<TextInput
					style={styles.input}
					placeholder="Month"
					onChangeText={reading => this.setMonth(reading)}
					defaultValue={this.state.month}
					ref={input => { this.monthInput = input }}
          keyboardType="numeric"
				/>)}
        { this.state.checkedForProps && (<Button style={styles.photoButton} onPress={()=>this.takePhoto()}
        title="Take Photo"/>)}
        {(this.state.checkedForProps) && (this.state.captures.length > 0)
          && (<Gallery style={styles.gallery} captures={this.state.captures} onDelete={this.handleDeletePhoto}/>)}
        {(this.state.checkedForProps) && (this.state.captures.length > 0)
          && (<Button style={styles.saveButton} onPress={()=>this.saveBill()}
          title="Save Bill" />)}

      </View>
      </ScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview:{
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
	  borderWidth: 1,
    borderColor: '#777',
    width: 0.7 * width,
	  height: 36,
    fontSize:16,
    paddingLeft: 5,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20
  },
  text: {
    marginTop: 10,
    alignSelf:'center',
  },
  saveButton: {
    alignSelf:'center',
    marginTop: 30,
  },
  photoButton: {
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 30,
  },
  gallery:{
    alignSelf: 'center',
  },
  galleryContainer: {
    bottom: 100
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  },
  bottomToolbar: {
      width: width,
      position: 'absolute',
      height: 100,
      bottom: 0,
  }
});

export default withNavigation(PhotoScreen);
