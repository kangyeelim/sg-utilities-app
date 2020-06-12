import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({focused}) => (
      <Ionicons name={`ios-options`} size={25} />
    ),
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
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

export default withNavigation(SettingsScreen);
