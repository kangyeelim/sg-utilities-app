import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

var { height, width } = Dimensions.get('window');

class PhotoScreen extends React.Component {
  static navigationOptions = {
    title: 'New Bill',
  }

  constructor() {
    super();
    this.state = {
      year: 0,
      month: 0,
    };
  }

  setYear(year) {
    this.setState({year:year});
  }

  setMonth(month) {
    this.setState({month:month});
  }

  takePhoto() {
    this.props.navigation.navigate('Camera', {year:this.state.year, month:this.state.month});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Year (YYYY):</Text>
        <TextInput
					style={styles.input}
					placeholder="Reading"
					onChangeText={reading => this.setYear(reading)}
					defaultValue={this.state.year}
					ref={input => { this.yearInput = input }}
          keyboardType="numeric"
				/>
        <Text>Month (MM):</Text>
        <TextInput
					style={styles.input}
					placeholder="Reading"
					onChangeText={reading => this.setMonth(reading)}
					defaultValue={this.state.month}
					ref={input => { this.monthInput = input }}
          keyboardType="numeric"
				/>
        <Button onPress={()=>this.takePhoto()}
        title="Take Photo"/>
        <View></View>
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
  }
});

export default withNavigation(PhotoScreen);
