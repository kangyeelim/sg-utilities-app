import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const localNotification = {
    title: 'Utilities Tracker',
    body: 'It is time to record your meter readings. Keep up the good work!', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({focused}) => (
      <Ionicons name={`ios-options`} size={25} />
    ),
  }

  constructor() {
    super();
    this.state = {
      expoPushToken: '',
      notification: localNotification,
      time: null,
    }
  }

  /*registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };*/

  componentDidMount() {
    //this.registerForPushNotificationsAsync();
  }

  setTime(time) {
    console.log(time);
    this.setState({time:time});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Set Daily Meter Reading Time</Text>
        
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
