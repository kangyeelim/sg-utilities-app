import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class BillsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'All Bills',
  })

  addBill() {
    this.props.navigation.push('Bill');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={()=>this.addBill()}
        title="Add Bill"/>
        <Text>Bills</Text>
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

export default withNavigation(BillsScreen);
