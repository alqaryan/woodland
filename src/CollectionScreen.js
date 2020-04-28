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
    // this.getIdents();
    // this.getUserImages();
    this.createMarkers2();
  }


// populate data state with all user images so flatlist will for through and render all
  getUserImages = async () => {
    const folderRef = firebase.storage().ref("/test/images/");
    folderRef.listAll().then((result) => {
      result.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => { 
          const joined = this.state.data.concat({ id: "0", source: url });
          this.setState({ data: joined });
        })
      }) 
    }).catch(function(error) {
      console.log(error);
    });
    console.log(this.state.images);
  }

  // this.setState({
  //   result: {
  //      ...this.state.result,
  //      [id]: value
  //   }
  // });

// // Since you mentioned your images are in a folder,
//     // we'll create a Reference to that folder:
//     var storageRef = firebase.storage().ref("your_folder");


//     // Now we get the references of these images
//     storageRef.listAll().then(function(result) {
//       result.items.forEach(function(imageRef) {
//         // And finally display them
//         displayImage(imageRef);
//       });
//     }).catch(function(error) {
//       // Handle any errors
//     });

//     function displayImage(imageRef) {
//       imageRef.getDownloadURL().then(function(url) {
//         // TODO: Display the image on the UI
//       }).catch(function(error) {
//         // Handle any errors
//       });
//     }

  // Item({ title }) {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.title}>{title}</Text>
  //     </View>
  //   );
  // }

  getIdents = async () => {
    const user = firebase.auth().currentUser;
    firebase
    .firestore()
    .collection("users")
    .doc(user.uid) // document labeled with user email
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        const userInfo = doc;
        const userIdents = userInfo.get('idents');
        console.log('Document data:', doc.data());
        console.log("userIdents: " + userIdents);
        // userIdents.forEach(async (ident) => {
        //   this.createMarkers(ident);
        // });
        // for(i=0; i<userIdents.length; i++) {
        //   console.log(userIdents[i]);
        //   this.createMarkers(userIdents[i]);
        // }
        // for(let ident of userIdents) {
        //   this.createMarkers(ident);
        // }
        this.setState({ idents: userIdents });
        console.log("state: " + this.state.idents);
        //this.createMarkers();

      }
    })
    .catch(error => {
      console.log('Error getting document', error);
    });
  }

  createMarkers = async () => {
    console.log("in createmarkers state: " + this.state.idents);
    const userIdents = this.state.idents;
    console.log("in create markers userIdents: " + userIdents);
    // for(let ident of userIdents) {
    for(let i=0; i<userIdents.length; i++) {
      console.log("ident received in createMarkers: " + userIdents[i]);
      if (typeof(userIdents[i]) === 'string') {
        console.log("isString");
      }
      else {
        console.log("its not");
      }
      const snapshot = await firebase
      .firestore()
      .collection("identifications")
      .doc(userIdents[i])
      .get()
      console.log(snapshot);
      snapshot.docs.map(doc => {
        if (!doc.exists) {
          console.log(userIdents[i]);
          console.log('No such document!');
        } else {
          // const userInfo = datdoc;
          // const userIdents = userInfo.get('idents');
          console.log('ident data: ', doc.data());
        }
      })
      .catch(error => {
        console.log('Error getting document', error);
      });
    
      // const latlng = {latitude: 43.075, longitude: -89.403894}
      //   this.state.markers.push(
      //     <Marker
      //       key="1"
      //       identifier="1"
      //       coordinate= { latlng }
      //       title="test"
      //     />
      //   );
      //});
    }
  }

  createMarkers2 = async () => {
    const user = firebase.auth().currentUser;

    const snapshot = await firebase.firestore().collection("identifications").get();
    snapshot.docs.forEach(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        // const userInfo = datdoc;
        // const userIdents = userInfo.get('idents');
        //console.log('ident data: ', doc.data());
        const identInfo = doc;
        const identPhoto = identInfo.get('filename');
        const identCoord = identInfo.get("latlng");
        // const joined = this.state.idents.concat(identCoord);
        // this.setState({ idents: joined })
        console.log(identCoord);

        const latlng = {latitude: 43.075, longitude: -89.403894}
        const joined = this.state.markers.concat(
        //this.state.markers.push(
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
          <TouchableOpacity onPress={() => {
            this.setState({ 
            numColumns:1, 
            listGridShow: true,
            mapShow: false 
            });
            this.getIdents();
          }} 
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
