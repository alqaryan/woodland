import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text>Collection</Text>
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

// added below for Jest testing
try {
  module.exports = SettingsScreen;
} catch (error) {
  console.log('we caught an error');
}

// original code

//import 'react-native-gesture-handler';
//import React, { useState,useEffect} from "react";
//import { StyleSheet, Text, View } from "react-native";

//export default function CollectionScreen(){
//  return(
//    <View style={styles.container}>
//        <Text>Collection</Text>
//      </View>
//  );
//}

//const styles = StyleSheet.create({
//  container: { flex: 1, justifyContent: "center", alignItems: "center" },
//  bigBlue: {
//    color: 'blue',
//    fontWeight: 'bold',
//    fontSize: 30,
//  },
//  red: {
//    color: 'red',
//  },
//});
