import React from 'react'
import {TouchableOpacity, View, Text, Image, StyleSheet, Dimensions} from 'react-native'

const SelectAPictureTile = props => (
  <TouchableOpacity onPress={props.onSelectPicture}>
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={props.source} />
      <Text style={styles.text}>Select a picture</Text>
    </View>
  </TouchableOpacity>
)

export default SelectAPictureTile

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height / 3.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#999999',
    borderColor: '#9f9f9f',
    borderWidth: 1,
    paddingBottom: 7,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
})
