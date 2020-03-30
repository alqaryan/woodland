import React, { useState,useEffect} from "react";
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Header } from "react-native-elements"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { FontAwesome } from '@expo/vector-icons';

export default function DiscoverScreen() {
    return (
      <View style={styles.container}>

          <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
          <Header
            barStyle="light-content" // or directly
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff', fontSize: 18 } }}
            containerStyle={{
              backgroundColor: 'rgba(		255, 187, 47, 1)',
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
            }}
          />
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="camera-retro" size={25} style={{color: 'white'}}> Take Photo
           </FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          <FontAwesome name="photo" size={25} style={{color: 'white'}}> Choose from Library
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
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    padding: 25,
    marginBottom: 40,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
