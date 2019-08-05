import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import AnalyzeScreen from './screens/AnalyzeScreen'

const AppNavigator = createAppContainer(createStackNavigator({
  Home: HomeScreen,
  Analyze: AnalyzeScreen,
}))

export default AppNavigator
