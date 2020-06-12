import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { connect } from 'react-redux';

class SubmitScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Choose Date',
  })

  handleSelectDate({day}) {
    this.props.navigation.push('ReadingForm', day)
  }

  render() {
    return (
      <View style={styles.container}>

        <Calendar onDayPress={(day) => this.handleSelectDate({day})}
        markedDates={this.props.markedDates}
        markingType={'multi-dot'}/>
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
});

const mapStateToProps = (state) => {
  return {
    markedDates: state.markedDates,
  }
}

export default withNavigation(connect(mapStateToProps, {}) (SubmitScreen));
