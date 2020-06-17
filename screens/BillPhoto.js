import React from 'react';
import { StyleSheet, Image, Dimensions, View, ScrollView, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import ImageZoom from 'react-native-image-pan-zoom';
var { height, width } = Dimensions.get('window');

class BillPhoto extends React.Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
      <Text>{this.props.navigation.getParam('month')} {this.props.navigation.getParam('year')}</Text>
      {this.props.navigation.getParam('captures').map((uri) => (
        <ImageZoom cropWidth={0.8 * width}
                  cropHeight={0.75 * height}
                  imageWidth={0.8 * width}
                  imageHeight={0.75 * height}>

            <Image style={styles.image}
            source={{uri}}/>


        </ImageZoom>
        ))}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width:0.8 * width,
    height:0.75 * height,
    marginTop: 20
  }
})

export default withNavigation(BillPhoto)
