import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import * as FileSystem from 'expo-file-system';
import Toolbar from './Toolbar.js'
import Gallery from './Gallery.js'

var { height, width } = Dimensions.get('window');

class CameraPage extends React.Component {
  static navigationOptions = ({navigation}) => ({
  })

  camera = null;

  state = {
    captures: [],
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
    year: 0,
    month: 0,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({capturing:false});
        const filename = new Date().getTime() + '.jpg';
        const directory = 'Pictures';
        const image = `${FileSystem.documentDirectory}${directory}/` + filename;
        await FileSystem.copyAsync({from:photoData.uri, to:image}).catch((error) => {
            console.log(JSON.stringify(error));
        });
        this.setState({captures:[image, ...this.state.captures]});
        this.props.navigation.navigate('PhotoScreen',
        {
          year:this.state.year,
          month:this.state.month,
          captures:this.state.captures,
        });

        //need to save into store dates with uri after making copy in filesystem
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
    this.setState({captures:this.props.navigation.getParam('captures')});
    this.setState({year:this.props.navigation.getParam('year')});
    this.setState({month:this.props.navigation.getParam('month')});
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
            flashMode={this.state.flashMode}
          />
        </View>
        <Toolbar
        capturing={this.state.capturing}
        flashMode={this.state.flashMode}
        cameraType={this.state.cameraType}
        setFlashMode={this.setFlashMode}
        setCameraType={this.setCameraType}
        onCaptureIn={this.handleCaptureIn}
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
