import React from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { deleteReminder, updateReminder, resetStore } from '../redux/actions'
import { connect } from 'react-redux';

const DAILY_READING_REMINDER = 'daily_reading_reminder';

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
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Settings',
  })

  constructor(props) {
    super(props);
    this.state = {
      expoPushToken: '',
      notification: localNotification,
      date: null,
      isDatePickerVisible: false,
      isEnabled: false,
      reminder: this.props.reminder,
    }
  }

  registerForPushNotificationsAsync = async () => {
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
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    if (this.state.reminder.length == 1) {
      this.setDate(this.state.reminder[0].date);
      this.setIsEnabled(true);
    }
  }

  setDatePickerVisibility(boolean) {
    this.setState({isDatePickerVisible:boolean});
  }

  setDate(date) {
    console.log(date);
    this.setState({date:date});
  }

  setIsEnabled(boolean) {
    this.setState({isEnabled:boolean});
  }

  showDatePicker = () => {
    this.setDatePickerVisibility(true);
  };

  handleConfirm = async (dt) => {
    this.hideDatePicker();
    console.log("A time has been picked: ");
    console.log(dt);
    this.setDate(dt);
    var id = await Notifications.scheduleLocalNotificationAsync(localNotification, {time:dt.getTime(), repeat:'day'})
    console.log("The returned id is: ");
    console.log(id);
    this.props.updateReminder({type:DAILY_READING_REMINDER, date:dt, notification_id:id})
  };

  hideDatePicker = () => {
    this.setDatePickerVisibility(false);
  }

  cancelSetTime = () => {
    this.hideDatePicker();
    this.setIsEnabled(false);
    this.props.deleteReminder(DAILY_READING_REMINDER)
  }

  toggleSwitch = async () => {
    if (this.state.isEnabled == true) {
      this.setIsEnabled(false);
      var reminder = this.state.reminder.filter((reminder)=> reminder.type == DAILY_READING_REMINDER);
      await Notifications.cancelScheduledNotificationAsync(reminder[0].notification_id);
      await Notifications.cancelAllScheduledNotificationsAsync()
      console.log("the notification id deleted is: ");
      console.log(reminder[0].notification_id);
      this.props.deleteReminder(DAILY_READING_REMINDER);
      this.setDate(null);
    } else if (this.state.isEnabled == false) {
      this.setIsEnabled(true);
      this.showDatePicker();
    }
  }

  formatTime() {
    var dt = this.state.date;
    var h =  dt.getHours(), m = dt.getMinutes();
    if (parseInt(m) < 10) {
      m = "0" + m;
    }
    var formattedH = h;
    if (h > 12 && parseInt(h - 12) < 10) {
      formattedH = "0" + (h - 12);
    } else if (h <= 12 && parseInt(h) < 10 ) {
      formattedH = "0" + h;
    }
    var _time = (h > 12) ? (formattedH + ':' + m +' PM') : (formattedH + ':' + m +' AM');
    return _time;
  }

  resetData = async () => {
    this.props.resetStore();
    const directory = 'Pictures';
    const fileUri = `${FileSystem.documentDirectory}${directory}`
    var arr = await FileSystem.readDirectoryAsync(fileUri);
    for (var i = 0; i < arr.length; i++) {
      await FileSystem.deleteAsync(arr[i]).catch((error) => {
        console.log(JSON.stringify(error));
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.text}>Daily Meter Reading Reminder</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
          />
        </View>
        <Button
          onPress={this.resetData}
          title="Delete & Reset All Data"
        />
        { this.state.isDatePickerVisible && (<DateTimePickerModal
          date={new Date()}
          isVisible={this.state.isDatePickerVisible}
          mode="time"
          onConfirm={this.handleConfirm}
          onCancel={this.cancelSetTime}
        />)}
        { this.state.date != null && (<Text>{this.formatTime()}</Text>)}
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
  switch: {
    alignSelf: 'center',
    margin: 10
  },
  text: {
    alignSelf:'center'
  }
});

const mapStateToProps = (state) => {
  return {
    reminder: state.reminder,
  }
}


export default withNavigation(connect(mapStateToProps, { deleteReminder:deleteReminder, updateReminder:updateReminder, resetStore:resetStore}) (SettingsScreen));
