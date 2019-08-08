import React from 'react'
import {View, ScrollView, Image, Button, StyleSheet, Dimensions} from 'react-native'

import {callGoogleVisionApi} from '../api'

export default class AnalyzeScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
  }

  // Processes the Google vision API response JSON
  processResult = result => {
    // If the result is an empty object return false else process the result
    if (Object.keys(result.responses[0]).length === 0) {
      return false
    } else {
      const objArray = result.responses[0].localizedObjectAnnotations

      // Convert normalized vertices in proportion to the displayed image size
      const tempResult1 = objArray.map(obj => ({
        ...obj,
        boundingPoly: obj.boundingPoly.normalizedVertices.map(point => ({
          x: ('x' in point) ? (point.x * Dimensions.get('window').width) : 0,
          y: ('y' in point) ? (point.y * (Dimensions.get('window').width / this.props.navigation.getParam('aspectRatio'))) : 0
        }))
      }))

      // Convert points to strings
      const tempResult2 = tempResult1.map(obj => ({
        ...obj,
        boundingPoly: obj.boundingPoly.map(point => ({
          p: point.x.toString() + ',' + point.y.toString()
        })),
        // Get the bottom-left point separately whereat to display the object name
        p4x: (obj.boundingPoly[3].x + 5).toString(),
        p4y: (obj.boundingPoly[3].y - 5).toString(),
      }))

      // Join all the points as a string
      const tempResult3 = tempResult2.map(obj => ({
        ...obj,
        boundingPoly: obj.boundingPoly.map(point => point.p).join(' ')
      }))

      // Remove duplicate bounding boxes
      const uniqueResults = Array.from(new Set(tempResult3.map(obj => obj.boundingPoly)))
        .map(boundingPoly => {
          return tempResult3.find(obj => obj.boundingPoly === boundingPoly)
        })

      return uniqueResults
    }
  }

  handleAnalyze = async (encodedImage) => {
    const result = await callGoogleVisionApi(encodedImage)
    const uniqueResults = this.processResult(result)
    // Navigate to the 'ResultScreen' with the image and objects info
    this.props.navigation.navigate('Result', {
      imageUri: this.props.navigation.getParam('imageUri'),
      aspectRatio: this.props.navigation.getParam('aspectRatio'),
      objects: uniqueResults
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <Image
            source={{uri: this.props.navigation.getParam('imageUri')}}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width / this.props.navigation.getParam('aspectRatio')
            }}
          />
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Button color='#555' title='Analyze' onPress={() => this.handleAnalyze(this.props.navigation.getParam('encodedImage'))} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#999',
  },
  bottomContainer: {
    paddingBottom: 17,
    paddingTop: 7,
    marginHorizontal: 40,
  },
})
