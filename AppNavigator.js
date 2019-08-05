import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomeScreen from './screens/HomeScreen'

const AppNavigator = createAppContainer(createStackNavigator({
  Home: HomeScreen,
}))

export default AppNavigator
