import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import AnalyzeScreen from './screens/AnalyzeScreen'
import ResultScreen from './screens/ResultScreen'

const AppNavigator = createAppContainer(createStackNavigator({
  Home: HomeScreen,
  Analyze: AnalyzeScreen,
  Result: ResultScreen,
}))

export default AppNavigator
