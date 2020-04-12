import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
const TensorCamera = cameraWithTensors(Camera);

export default function CameraModeScreen() {

    //back-end
    const handleCameraCapture = () => {

    }

    const handleCameraStream = (images, updatePreview, gl) => {
      const loop = async () => {
        const nextImageTensor = images.next().value
  
        //
        // do something with tensor here
        //
        
        requestAnimation(loop);
      }

      loop();
    }

    let textureDims;
    if (Platform.OS === 'ios') {
      textureDims = {
        height: 1920,
        width: 1080,
      };
    } else {
      textureDims = {
        height: 1200,
        width: 1600,
      };
    }

    return (
      
      <View style={{ flex: 1 }}>
        <TensorCamera
          //Standard Camera props
          style={{ flex: 1 }}
          type={Camera.Constants.Type.front}
          //Tensor related props
          cameraTextureHeight={1920}
          cameraTextureWidth={1080}
          resizeHeight={200}
          resizeWidth={152}
          resizeDepth={3}
          onReady={() => handleCameraStream()}
          autorender={true}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: "column",
          }}>

          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => handleCameraCapture()}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'red' }}> capture </Text>
          </TouchableOpacity>

        </View>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
