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

import * as Permissions from 'expo-permissions'

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

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
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  imageToTensor(rawImageData: ArrayBuffer): tf.Tensor3D {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  // Drop the alpha channel info for mobilenet
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
  // res.print(true);
  return res;
  }

  addToCollection = async () => {
    if (this.state.image) {
    const user = firebase.auth().currentUser;
    const imagePath = Image.resolveAssetSource(this.state.image);
    console.log(imagePath.uri + " image uri");

    const imageExtension = imagePath.uri.split('.').pop(); //gets image extension
    const filename = `${user.uid}.${Date.now()}.${imageExtension}`; // Generate name for file to be uploaded
    console.log(filename + " new filename");

    const imageBlob = this.uriToBlob(imagePath.uri);
    this.uriToBlob(imagePath.uri).then((blob)=>{

      firebase
        .storage()
        .ref(`test/images/${filename}`)
        .put(blob)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let state = {};
            state = {
              ...state,
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
            };
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              alert("upload to firebase storage successful");
            }
          },
          error => {
            console.log(error);
            alert(error);
          }
        );

    }).catch((error)=>{
      throw error;
    });
    this.updateFirestore(filename);
    alert("Successfully saved image");
  } else {
    alert("No image to save");
  }
  }

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  updateFirestore = (filename) => {
    const user = firebase.auth().currentUser;
    //const location = firebase.firestore().GeoPoint(43.075, -89.403894);

    const location = new firebase.firestore.GeoPoint(43.075, -89.403894)
    // upload to new event to identifications collection
    firebase
    .firestore()
    .collection("identifications")
    .add({
      userID: user.uid,
      latlng: location,
      predictions: this.state.resultArray,
      filename: filename,
      })
    .then(function() {
      console.log("ident upload to firestore successful");
    })
    .catch(function(error) {
      console.log(error);
    });

    // connect identification to user profile
    firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .update({
      identifications: {
        identNum: `gs://woodland-2.appspot.com/test/images/${filename}`
      }
    })
    .then(function() {
      console.log("ident linked to user account");
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  classifyImage = async () => {
    try {
      const imageAssetPath = Image.resolveAssetSource(this.state.image)
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
      const rawImageData = await response.arrayBuffer()
      const imageTensor = this.imageToTensor(rawImageData)
      const image = tf.reshape(imageTensor, [1, 224, 224, 3])
      // const imageTensorSum = imageTensor.sum();
      // const imageChecksum = (await imageTensorSum.data())[0];
      // this.model.predict(image).print();
      const predictions = await (this.model.predict(image))
      // console.log(predictions)
      const values = predictions.dataSync();
      const arr = Array.from(values);
      // console.log(arr);
      let tempArray = this.state.resultArray.slice();
      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i].predict = arr[i];
      }
      this.setState({ predictions })
      this.setState({resultArray: tempArray})
      // this.addToCollection();  //upload to firestore
    } catch (error) {
      console.log(error)
    }
  }

  selectImage = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      })

      if (!response.cancelled) {
        const source = { uri: response.uri }
        // do something with saving
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
      alert("Successfully removed image");
    } else {
      alert("No image to remove");
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
          <TouchableOpacity style={{marginRight: 15}} onPress={() => {this.addToCollection();}}>
            <Text style={styles.textStyle}>Save To Collection</Text>
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
