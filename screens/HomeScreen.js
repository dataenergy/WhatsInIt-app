import React from 'react'
import {View, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import SelectAPictureTile from '../components/SelectAPictureTile'

export default class HomeScreen extends React.Component {
  handleSelectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
    console.log(result)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <SelectAPictureTile source={require('../assets/photo_image.png')} onSelectPicture={this.handleSelectPicture} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
