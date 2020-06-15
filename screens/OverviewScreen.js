import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit'

var { height, width } = Dimensions.get('window');


class OverviewScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Overview',
  })

  constructor() {
    super();
    this.state = {
      fetchedElect: false,
      electBarData: null,
      fetchedWater: false,
      waterBarData: null,
      fetchedGas: false,
      gasBarData: null,
      electGraphWidth: 0,
      waterGraphWidth: 0,
      gasGraphWidth: 0,
    };
  }

  formatElectBarData() {
    const electBarData = this.getDataBar(this.props.electReadings);
    this.setState({electBarData: electBarData.barData});
    this.setState({electGraphWidth: electBarData.graphWidth});
    this.setState({fetchedElect: true});
  }

  formatWaterBarData() {
    const waterBarData = this.getDataBar(this.props.waterReadings);
    this.setState({waterBarData: waterBarData.barData});
    this.setState({waterGraphWidth: waterBarData.graphWidth});
    this.setState({fetchedWater: true});
  }

  formatGasBarData() {
    const gasBarData = this.getDataBar(this.props.gasReadings);
    this.setState({gasBarData: gasBarData.barData});
    this.setState({gasGraphWidth: gasBarData.graphWidth});
    this.setState({fetchedGas: true});
  }

  getDataBar(readings) {
    var graphWidth = 0.9 * width;
    var electLabels = [];
    var electData = [];
    var electBarData = null;
    var electReadings = readings;
    if (electReadings.length >= 2) {
      electReadings.sort(function(a,b) {
        a = a.id.split('-').join('');
        b = b.id.split('-').join('');
        return a > b ? 1 : a < b ? -1 : 0;
      // return a.localeCompare(b);         // <-- alternative
      });
      var start = 0;
      if (electReadings.length > 14) {
        start = electReadings.length - 15;
      }
      for (var i = start; i < electReadings.length - 1; i++) {
        electLabels.push(electReadings[i].id.substring(5, electReadings[i].id.length));
        var difference = parseInt(electReadings[i + 1].reading) - parseInt(electReadings[i].reading);
        console.log()
        console.log(difference)
        electData.push(difference);
      }

      electBarData = {
        labels: electLabels,
        datasets: [
          {
            data: electData,
          },
        ],
      }

      if (electReadings.length > 7) {
        graphWidth = 1.5 * width;
      } else if (electReadings.length > 10) {
        graphWidth = 2 * width;
      }
    } else {
      electBarData = {
        labels: ['no data'],
        datasets: [
          {
            data: [0],
          },
        ],
      }
    }
    return { barData: electBarData, graphWidth: graphWidth};
  }

  componentDidMount() {
    this.formatElectBarData();
    this.formatWaterBarData();
    this.formatGasBarData();
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.formatElectBarData();
      this.formatWaterBarData();
      this.formatGasBarData();
    });

  }

  componentWillUnmount() {
    // Remove the event listener
   this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>Electricity (kWh)</Text>
          <ScrollView horizontal={true}>
          { this.state.fetchedElect && (<BarChart
          data={this.state.electBarData}
          width={this.state.electGraphWidth}
          height={0.25 * height}
          chartConfig={chartConfigElect}
          />)}
          </ScrollView>
          <Text style={styles.header}>Water (m³)</Text>
          <ScrollView horizontal={true}>
          { this.state.fetchedWater && (<BarChart
          data={this.state.waterBarData}
          width={this.state.waterGraphWidth}
          height={ 0.25 * height}
          chartConfig={chartConfigWater}
          />)}
          </ScrollView>
          <Text style={styles.header}>Gas (kWh)</Text>
          <ScrollView horizontal={true}>
          { this.state.fetchedGas && (<BarChart
          data={this.state.gasBarData}
          width={this.state.gasGraphWidth}
          height={0.25 * height}
          chartConfig={chartConfigGas}
            />)}
            </ScrollView>
          </ScrollView>
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
  top: {
    marginTop:40,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    alignSelf: 'center',
    marginTop: 20
  },
  chartContainer: {
    marginBottom: 20,
  }
});

const chartConfigElect = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#F5F5F5",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(255, 20, 147, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  decimalPlaces: 1,
};

const chartConfigWater = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientFromOpacity: 0.1,
  backgroundGradientTo: "#F5F5F5",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 205, ${opacity})`,
  decimalPlaces: 1,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const chartConfigGas = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#F5F5F5",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 1,
  useShadowColorFromDataset: false // optional
};

const mapStateToProps = (state) => {
  console.log(state.electReadings);
  return {
    electReadings: state.electReadings,
    waterReadings: state.waterReadings,
    gasReadings: state.gasReadings,
    markedDates: state.markedDates,
  }
}

export default withNavigation(connect(mapStateToProps, {}) (OverviewScreen));
