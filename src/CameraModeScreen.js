import 'react-native-gesture-handler';
import React, { useState,useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import * as tf from '@tensorflow/tfjs'
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'

import * as jpeg from 'jpeg-js'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as MediaLibrary from 'expo-media-library';

import * as Permissions from 'expo-permissions'

class PhotoModeScreen extends React.Component {
  state = {
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    image: null,
    resultArray: [{species: 'daisy', predict:0}, {species: 'dandelion', predict:0}, {species: 'roses', predict:0},
    {species: 'sunflowers', predict:0}, {species: 'tulips', predict:0}
    ],
  }

  async componentDidMount() {
    await tf.ready()
    this.setState({
      isTfReady: true
    })
    const modelJson = require('../assets/model/model.json');
    const modelWeights = require('../assets/model/model_weights.bin');
    this.model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
    // console.log(JSON.stringify(this.model.outputs[0].shape));
    // this.model.predict(tf.ones([1, 224, 224, 3])).print();
    this.setState({ isModelReady: true })
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!')
      }
    }
  }

  imageToTensor(rawImageData: ArrayBuffer): tf.Tensor3D {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  // need to convert to 1 * 224 * 224 * 3
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];
    offset += 4;
  }
  const res = tf.image.resizeBilinear(tf.tensor3d(buffer, [height, width, 3]), [224, 224]);
  return res;
}

  classifyImage = async () => {
    try {
      const imageAssetPath = Image.resolveAssetSource(this.state.image)
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
      const rawImageData = await response.arrayBuffer()
      const imageTensor = this.imageToTensor(rawImageData)
      const image = tf.reshape(imageTensor, [1, 224, 224, 3])
      const predictions = await (this.model.predict(image))
      // changing from tensor array to normal array
      const values = predictions.dataSync();
      const arr = Array.from(values);
      // safe way to edit the state's array
      let tempArray = this.state.resultArray.slice();
      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i].predict = arr[i];
      }
      this.setState({ predictions })
      this.setState({resultArray: tempArray})
    } catch (error) {
      console.log(error)
    }
  }

  selectImage = async () => {
    try {
      let response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      })

      if (!response.cancelled) {
        const source = { uri: response.uri }
        // do something with saving
        // you may want this: const asset = await MediaLibrary.createAssetAsync(uri);
        this.setState({ image: source })
        this.classifyImage()
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderPrediction() {
      return this.state.resultArray.map((item, index) => <Text style={styles.text}
      key={index}>{item.species}: {item.predict}</Text>);
  }

  betterRenderPrediction() {
    const max = this.state.resultArray.reduce((prev, current) => (prev.predict > current.predict) ? prev : current, 1);
    if (max.predict < 0.8) {
      return <Text style={styles.text}>Can't predict</Text>;
    } else {
      return <Text style={styles.text}>{max.species}: {max.predict.toFixed(4)}</Text>;
    }
  }

  removeImage() {
    let clean = null;
    if (this.state.image) {
      this.setState({image: clean});
      this.setState({predictions: clean})
      console.log("Successfully removed image");
    } else {
      console.log("No image to remove");
    }
  }

  saveToLibrary() {
    if (this.state.image) {
      const imageAssetPath = Image.resolveAssetSource(this.state.image);
      MediaLibrary.saveToLibraryAsync(imageAssetPath.uri);
      let clean = null;
      this.setState({image: clean});
      this.setState({predictions: clean})
      console.log("Successfully saved image");
    } else {
      console.log("No image to save");
    }
  }

  render() {
    const { isTfReady, isModelReady, predictions, image } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>
            TFJS ready? {isTfReady ? <Text>✅</Text> : ''}
          </Text>

          <View style={styles.loadingModelContainer}>
            <Text style={styles.text}>Model ready? </Text>
            {isModelReady ? (
              <Text style={styles.text}>✅</Text>
            ) : (
              <ActivityIndicator size='small' />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={isModelReady ? this.selectImage : undefined}>
          {image && <Image source={image} style={styles.imageContainer} />}

          {isModelReady && !image && (
            <Text style={styles.transparentText}>Tap to choose image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.predictionWrapper}>
          {isModelReady && image && (
            <Text style={styles.text}>
              Predictions: {predictions ? '' : 'Predicting...'}
            </Text>
          )}
          {isModelReady &&
            predictions && image && this.betterRenderPrediction()
          }
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={{marginLeft: 15}} onPress={() => {this.removeImage();}}>
            <Text style={styles.textStyle}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 15}} onPress={() => {this.saveToLibrary();}}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
    alignItems: 'center'
  },
  loadingContainer: {
    marginTop: 40,
    justifyContent: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  },
  loadingModelContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: '#cf667f',
    borderWidth: 5,
    borderStyle: 'dashed',
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  transparentText: {
    color: '#ffffff',
    opacity: 0.7
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(69,75,79, 0.2)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  textStyle:{
    margin: 5,
    color: '#fff',
    fontSize:22
  }
})

export default PhotoModeScreen

