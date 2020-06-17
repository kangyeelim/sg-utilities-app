import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import ImageZoom from 'react-native-image-pan-zoom';
var { height, width } = Dimensions.get('window');

class BillPhoto extends React.Component {
  render() {
    return (
      <ImageZoom cropWidth={width}
                  cropHeight={height}
                  imageWidth={0.9 * width}
                  imageHeight={0.85 * height}>
          {this.props.navigation.getParam('captures').map((uri) => (
            <Image style={{width:0.9 * width, height:0.85 * height}}
            source={{uri}}/>
          ))}

        </ImageZoom>
    )
  }
}

export default withNavigation(BillPhoto)
