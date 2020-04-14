import React, { useState,useEffect} from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, View, FlatList } from "react-native";
import { Header } from "react-native-elements";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

var images = require('../assets/testflower.jpg');
var numColumns = 2;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Fourth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Fifth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Sixth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Seven Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Eight Item',
  },
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function CollectionScreen() {
    return (
    
    <View style={styles.container}>
      <Header
        barStyle="light-content" // or directly
        centerComponent={{ text: 'Collection', style: { color: '#fff', fontSize: 18 } }}
        containerStyle={{
          backgroundColor: 'red', //rgba(0,0,0,0)
          borderWidth: 0,
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => numColumns=1} style={styles.button}>
          <Text style={{ color: "#FFF", fontSize: 18 }}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => numColumns=2} style={styles.button}>
          <Text style={{ color: "#FFF", fontSize: 18 }}>Grid</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 120}}>
        <FlatList
          numColumns={numColumns}
          key={numColumns}
          style={{ marginTop: 20 }}
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 5
  },
  button: {
    backgroundColor: "green",
    height: 52,
    width: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    position: 'absolute',
    top: 87, left: 0, right: 0, bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  item: {
    backgroundColor: '#f9c2ff',
    flex: 1,
    margin: 2,
    aspectRatio: 1,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 32,
  }
});

// added below for Jest testing
try {
  module.exports = CollectionScreen;
} catch (error) {
  console.log('we caught an error');
}
