import React from 'react'
import {View, ScrollView, ImageBackground, Dimensions, StyleSheet} from 'react-native'
import Svg, {G, Polygon, Text} from 'react-native-svg'

export default class ResultScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={{uri: this.props.navigation.getParam('imageUri')}}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width / this.props.navigation.getParam('aspectRatio')
          }}
        >
          <Svg
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').width / this.props.navigation.getParam('aspectRatio')}
          >
            {(() => {
              if (this.props.navigation.getParam('objects') !== false) {
                return (
                  this.props.navigation.getParam('objects').map(object => (
                    <G key={object.mid}>
                      <Polygon
                        points={object.boundingPoly}
                        fill='none'
                        stroke='green'
                        strokeWidth='1.5'
                      />
                      <Text
                        x={object.p4x}
                        y={object.p4y}
                        fontSize='16'
                        stroke='white'
                        fill='blue'
                      >{object.name}</Text>
                    </G>
                  ))
                )
              } else {
                return (
                  <Text
                    x='10'
                    y={((Dimensions.get('window').width / this.props.navigation.getParam('aspectRatio')) / 2).toString()}
                    fontSize='16'
                    stroke='white'
                    fill='blue'
                  >No object detected</Text>
                )
              }
            })()}
          </Svg>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#999',
  },
})
