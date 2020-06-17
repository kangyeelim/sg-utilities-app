import React from 'react';
import { createAppContainer, createSwitchNavigator, withNavigation } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './screens/LoginScreen.js'
import OverviewScreen from './screens/OverviewScreen.js'
import BillsScreen from './screens/BillsScreen.js'
import PhotoScreen from './screens/PhotoScreen.js'
import BillPhoto from './screens/BillPhoto.js'
import CameraPage from './screens/CameraPage.js'
import SubmitScreen from './screens/SubmitScreen.js'
import SettingsScreen from './screens/SettingsScreen.js'
import ReadingForm from './screens/ReadingForm.js'
import { AntDesign } from '@expo/vector-icons';
import {store, persistor} from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const SubmitStack = createStackNavigator({
  MainScreen: SubmitScreen,
  ReadingForm: ReadingForm,
  },
  {
    initialRouteName: 'MainScreen'
})

const OverviewStack = createStackNavigator({
  OverviewScreen: OverviewScreen,
  },
  {
    initialRouteName: 'OverviewScreen'
})

const PhotoSwitch = createSwitchNavigator({
  PhotoScreen: PhotoScreen,
  Camera: CameraPage,
  },
  {
    initialRouteName: 'PhotoScreen',
    backBehavior: 'initialRoute'
})

const BillStack = createStackNavigator({
  BillsScreen: BillsScreen,
  Bill: PhotoSwitch,
  Photo: BillPhoto,
  }, {
    initialRouteName:'BillsScreen'
})

const Tabs = createBottomTabNavigator({
  Overview: OverviewStack,
  Bills: BillStack,
  Readings: SubmitStack,
  Settings: SettingsScreen,
})

BillStack.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <AntDesign name="filetext1" size={25} color="black" />
  ),
}

SubmitStack.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <AntDesign name="form" size={25} color="black" />
  ),
}

OverviewStack.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <AntDesign name="barschart" size={25} color="black" />
  ),
}

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: Tabs
})

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
    );
  }
}

export default App;
