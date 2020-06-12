import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';

class LoginScreen extends React.Component {
  componentDidMount() {
    setTimeout(()=>
      this.props.navigation.navigate('Main'), 1000)
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../img/login.png')} style={styles.image}>
      </ImageBackground>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 500
  }
});

export default withNavigation(LoginScreen);
