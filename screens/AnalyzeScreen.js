import React from 'react'
import {View, ScrollView, Image, Button, StyleSheet, Dimensions} from 'react-native'

import {callGoogleVisionApi} from '../api'

export default class AnalyzeScreen extends React.Component {
  static navigationOptions = {
    // Hide the header
    header: null,
  }

  handleAnalyze = encodedImage => {
    callGoogleVisionApi(encodedImage)
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
