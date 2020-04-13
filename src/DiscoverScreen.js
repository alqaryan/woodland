import React, { useState,useEffect} from "react";
import { Alert, TouchableOpacity, ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Header } from "react-native-elements"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { FontAwesome } from '@expo/vector-icons';

import PhotoModeScreen from "./PhotoModeScreen.js";
import CameraModeScreen from "./CameraModeScreen.js";

export default function DiscoverScreen({navigation}) {
    return (
      <View style={styles.container}>

          <ImageBackground source={require('../assets/background2.jpg')} style={styles.backgroundImage}>
          <Header
            barStyle="light-content" // or directly
            centerComponent={{ text: 'Discover', style: { color: '#fff', fontSize: 18 } }}
            containerStyle={{
              backgroundColor: 'rgba(52, 52, 52, 0.2)',
              borderWidth: 0,
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
            }}
          />

          <TouchableOpacity style={styles.button} onPress={() => {
            alert('Please wait when the model is loading!');
            navigation.navigate("CameraModeScreen");
          }} >
            <FontAwesome name="camera-retro" size={20} style={{color: 'black'}}> Take Photo
            </FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            alert('Please wait when the model is loading!');
            navigation.navigate("PhotoModeScreen");
          }} >
            <FontAwesome name="photo" size={20} style={{color: 'black'}}> Choose from Library
            </FontAwesome>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'rgba(52, 52, 52, 0.2)',
  },
});

