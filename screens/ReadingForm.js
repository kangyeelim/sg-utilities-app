import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { updateElectReading, updateMarkedDate,
  updateGasReading, updateWaterReading,
  deleteElectReading, deleteWaterReading,
  deleteGasReading } from '../redux/actions'


var { height, width } = Dimensions.get('window');

const electricity = {key:'electricity', color: 'red'};
const water = {key:'water', color: 'blue'};
const gas = {key:'gas', color: 'green'};

class ReadingForm extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Enter Meter Readings',
  })

  constructor() {
    super();
    this.state = {
      electReading: 0,
      waterReading: 0,
      gasReading: 0,
      fetchedElect: false,
      fetchedGas: false,
      fetchedWater: false,
      dots: [],
    };
  }

  setElectReading(reading) {
    this.setState({electReading:reading});
  }

  setWaterReading(reading) {
    this.setState({waterReading:reading});
  }

  setGasReading(reading) {
    this.setState({gasReading:reading});
  }

  componentDidMount() {
      this.getElectSubmittedReading();
      this.getWaterSubmittedReading();
      this.getGasSubmittedReading();
  }

  getElectSubmittedReading() {
    var arr = this.props.electReadings.filter((reading) => reading.id == this.props.navigation.getParam('dateString'));
    if (arr.length == 1) {
      this.setState({electReading: arr[0].reading});
    }
    this.setState({fetchedElect: true});
  }

  getWaterSubmittedReading() {
    var arr = this.props.waterReadings.filter((reading) => reading.id == this.props.navigation.getParam('dateString'));
    if (arr.length == 1) {
      this.setState({waterReading: arr[0].reading});
    }
    this.setState({fetchedWater: true});
  }

  getGasSubmittedReading() {
    var arr = this.props.gasReadings.filter((reading) => reading.id == this.props.navigation.getParam('dateString'));
    if (arr.length == 1) {
      this.setState({gasReading: arr[0].reading});
    }
    this.setState({fetchedGas: true});
  }

  submittedReading() {
    if (+this.state.electReading == 0) {
      this.props.deleteElectReading({id: this.props.navigation.getParam('dateString')});
    }

    if (+this.state.waterReading == 0) {
      this.props.deleteWaterReading({id: this.props.navigation.getParam('dateString')});
    }

    if (+this.state.gasReading == 0) {
      this.props.deleteGasReading({id: this.props.navigation.getParam('dateString')});
    }

    if (+this.state.electReading > 0) {
      this.props.updateElectReading({id: this.props.navigation.getParam('dateString'), reading: this.state.electReading});
      this.setState({dots: this.state.dots.push(electricity)});
    }

    if (+this.state.waterReading > 0) {
      this.props.updateWaterReading({id: this.props.navigation.getParam('dateString'), reading: this.state.waterReading});
      this.setState({dots: this.state.dots.push(water)});
    }

    if (+this.state.gasReading > 0) {
      this.props.updateGasReading({id: this.props.navigation.getParam('dateString'), reading: this.state.gasReading});
      this.setState({dots: this.state.dots.push(gas)});
    }

    this.props.updateMarkedDate({date: this.props.navigation.getParam('dateString'), dots: this.state.dots});
    this.props.navigation.push('MainScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Date: {this.props.navigation.getParam('dateString')}</Text>
        <Text>Electricity Meter Reading:</Text>
        { this.state.fetchedElect && (<TextInput
					style={styles.input}
					placeholder="Reading"
					onChangeText={reading => this.setElectReading(reading)}
					defaultValue={this.state.electReading.toString()}
					ref={input => { this.electReadingInput = input }}
          keyboardType="numeric"
				/>)}
        <Text>Water Meter Reading:</Text>
        { this.state.fetchedElect && (<TextInput
      	style={styles.input}
      	placeholder="Reading"
        onChangeText={reading => this.setWaterReading(reading)}
        defaultValue={this.state.waterReading.toString()}
      	ref={input => { this.waterReadingInput = input }}
        keyboardType="numeric"
      	/>)}
        <Text>Gas Meter Reading:</Text>
        { this.state.fetchedElect && (<TextInput
        style={styles.input}
        placeholder="Reading"
        onChangeText={reading => this.setGasReading(reading)}
        defaultValue={this.state.gasReading.toString()}
        ref={input => { this.gasReadingInput = input }}
        keyboardType="numeric"
        />)}
        <Button
        onPress={()=>this.submittedReading()}
        title="Submit"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    margin: 20
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

const mapStateToProps = (state) => {
  return {
    electReadings: state.electReadings,
    waterReadings: state.waterReadings,
    gasReadings: state.gasReadings,
  }
}

export default withNavigation(connect(mapStateToProps, { updateElectReading: updateElectReading,
  updateMarkedDate: updateMarkedDate, updateGasReading:updateGasReading, updateWaterReading:updateWaterReading,
  deleteElectReading: deleteElectReading, deleteWaterReading:deleteWaterReading, deleteGasReading:deleteGasReading}) (ReadingForm));
