import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Gallery from './Gallery.js';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>Year (YYYY):</Text>
        { this.state.checkedForProps && (<TextInput
					style={styles.input}
					placeholder="Year"
					onChangeText={reading => this.setYear(reading)}
					defaultValue={this.state.year}
					ref={input => { this.yearInput = input }}
          keyboardType="numeric"
				/>)}
        <Text>Month (MM):</Text>
        { this.state.checkedForProps && (<TextInput
					style={styles.input}
					placeholder="Month"
					onChangeText={reading => this.setMonth(reading)}
					defaultValue={this.state.month}
					ref={input => { this.monthInput = input }}
          keyboardType="numeric"
				/>)}
        { this.state.checkedForProps && (<Button onPress={()=>this.takePhoto()}
        title="Take Photo"/>)}
        {(this.state.checkedForProps) && (this.state.captures.length > 0)
          && (<Gallery captures={this.state.captures}/>)}
        {(this.state.checkedForProps) && (this.state.captures.length > 0)
          && (<Button onPress={()=>this.saveBill()}
          title="Save Bill" />)}
      </View>
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
  galleryContainer: {
    bottom: 100
  },
  galleryImageContainer: {
    width: 0.95 * width,
    height: height,
    marginRight: 5
  },
  galleryImage: {
    width: 0.95 * width,
    height: height
  },
  bottomToolbar: {
      width: width,
      position: 'absolute',
      height: 100,
      bottom: 0,
  }
});

export default withNavigation(PhotoScreen);
