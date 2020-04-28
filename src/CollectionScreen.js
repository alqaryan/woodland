import React, { useState,useEffect} from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, View, Dimensions, FlatList, Image } from "react-native";
import { Header } from "react-native-elements";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MapView, { Marker } from 'react-native-maps';

import { FontAwesome } from '@expo/vector-icons';

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

var image1 = require('../assets/testflower.jpg');
var image2 = require('../assets/testflower2.jpg');
var image3 = require('../assets/testflower3.jpg');
var image4 = require('../assets/testflower4.jpg');
var image5 = require('../assets/testflower5.jpg');
var image6 = require('../assets/testflower6.jpg');


const userImages = [
  {
    id:"1",
    source: image1
  },
  {
    id:"2",
    source: image2
  },
  {
    id:"3",
    source: image3
  },
  {
    id:"4",
    source: image4
  },
  {
    id:"5",
    source: image5
  },
  {
    id:"6",
    source: image6
  },
]

const Pic = ({ source }) => {
  return (
    <View style={ styles.item }>
      <Image 
        style={ styles.image }
        source={ source } 
        resizeMode="cover"
      />
    </View>
  );
}

class CollectionScreen extends React.Component {
  state = {
    numColumns: 2,
    data: userImages,
    listGridShow: true,
    mapShow: false,
    markers: [],
    idents: [],
  }

  componentDidMount() {
    this.createMarkers();
  }

  createMarkers = async () => {
    const user = firebase.auth().currentUser;

    const snapshot = await firebase.firestore().collection("identifications").get();
    snapshot.docs.forEach(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        const identInfo = doc;
        const identPhoto = identInfo.get('filename');
        const identCoord = identInfo.get("latlng");
        const joined = this.state.markers.concat(
          <Marker
            key={ identPhoto }
            identifier={ identPhoto }
            coordinate= { identCoord }
            title={identPhoto}
          />
        );
        this.setState({ markers: joined })
      }
    });
  }

  render() {
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
          <TouchableOpacity onPress={() => this.setState({ 
            numColumns:1, 
            listGridShow: true,
            mapShow: false 
            })} 
            style={styles.button}>
            <Text style={{ color: "#FFF", fontSize: 18 }}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ 
            numColumns:2, 
            listGridShow: true,
            mapShow: false
            })} style={styles.button}>
            <Text style={{ color: "#FFF", fontSize: 18 }}>Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ 
              numColumns:2, 
              listGridShow: false,
              mapShow: true
            })} 
          style={styles.button}>
            <Text style={{ color: "#FFF", fontSize: 18 }}>Map</Text>
          </TouchableOpacity>
          {/* Map button should turn the flatlist invisible, make map visible */}
        </View>
        {/* <List columns = {this.state.numColumns} /> */}
        { this.state.listGridShow &&
          <View style={{marginTop: 125}}>
            <FlatList
              numColumns={this.state.numColumns}
              key={this.state.numColumns}
              style={{ marginTop: 20 }}
              data={this.state.data}
              renderItem={({ item }) => <Pic source={item.source} />}
              keyExtractor={item => item.id}
            />
          </View>
        }
        { this.state.mapShow &&
          <View style={{marginTop: 142, alignItems: 'center'}}>
            <MapView
              style={ styles.mapStyle }
              region={{
                latitude: 43.075, 
                longitude: -89.403894, 
                latitudeDelta: 0.007, 
                longitudeDelta: 0.003 
              }}
              showsUserLocation={true}
            >
              {this.state.markers}
            </MapView>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 5
  },
  button: {
    backgroundColor: "red",
    height: 52,
    width: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    position: 'absolute',
    top: 90, left: 0, right: 0, bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  item: {
    flex: 1,
    backgroundColor: '#f9c2ff',
    margin: 2,
    aspectRatio: 1,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
    alignItems: "center", 
    justifyContent: "center"
  },
  image: {
    flex: 1, 
    alignSelf: 'stretch', 
    width: undefined, 
    height: undefined, 
    backgroundColor:"red"
  },
  title: {
    fontSize: 32,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

// added below for Jest testing
try {
  module.exports = CollectionScreen;
} catch (error) {
  console.log('we caught an error');
}
