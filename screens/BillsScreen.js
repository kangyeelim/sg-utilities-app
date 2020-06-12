import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

class BillsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({focused}) => (
      <AntDesign name="filetext1" size={25} color="black" />
    ),
  }
  
  render() {
    return (
      <View style={styles.container}>
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
