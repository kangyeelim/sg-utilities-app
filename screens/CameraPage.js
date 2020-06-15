import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import Toolbar from './Toolbar.js'

var { height, width } = Dimensions.get('window');

class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [],
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] });
        this.props.navigation.navigate('PhotoScreen', {year:this.props.navigation.getParams('year'),
        month:this.props.navigation.getParam('month'), captures:this.state.captures});
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

    this.setState({ hasCameraPermission });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View></View>;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            style={styles.preview}
            ref={camera => this.camera = camera}
            type={this.state.cameraType}
          />
        </View>
        <Toolbar
        capturing={this.state.capturing}
        flashMode={this.state.flashMode}
        cameraType={this.state.cameraType}
        setFlashMode={this.setFlashMode}
        setCameraType={this.setCameraType}
        onShortCapture={this.handleShortCapture} />
      </React.Fragment>
    );
  };
}

export const styles = StyleSheet.create({
    preview: {
      flex: 1,
      height: height,
      width: width,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: width,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
});

export default withNavigation(CameraPage);
