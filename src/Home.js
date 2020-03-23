import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Foundation, Entypo } from "react-native-vector-icons";
import SettingsScreen from "./SettingsScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import ExplorerScreen from "./ExplorerScreen.js";
import CollectionScreen from "./CollectionScreen.js";
import { Button } from "react-native-paper";
//import fire from "./config/fire.js";
import * as firebase from "firebase";
import LoadingScreen from "./LoadingScreen.js";

function DiscoverScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Discover</Text>

      <Button 
        onPress={() => {
          //if(firebase.auth().currentUser){
            //console.log(fire.auth().currentUser)
            firebase.auth().signOut();
            navigation.goBack();
            console.log(firebase.auth().currentUser)
          //}else{
            
         // }
          
        }}
      />
      
    </View>
  );
}

export default function Home({navigation}) {
  const bottomTab = createMaterialBottomTabNavigator();
  return (
    <bottomTab.Navigator 
      backBehavior='none'
      labeled='false'>

      <bottomTab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Foundation name="magnifying-glass" color={color} size={27.5} />
          ),
          tabBarColor: "orange"
        }}
      />

      <bottomTab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="library-shelves" color={color} size={27.5} />
          ),
          tabBarColor: "red"
        }}
      />

      <bottomTab.Screen
        name="Explore"
       
        component={ExplorerScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" color={color} size={27.5} />
          ),
          tabBarColor: "purple"
        }}
      />
      <bottomTab.Screen
        name="Settings"
       
        component={SettingsScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={color} size={27.5} />
          ),
          tabBarColor: "green"
        }}
      />

      <bottomTab.Screen
        name="SignOut"
        
        component={LoadingScreen}
        listeners={{
          tabPress: e =>{
            firebase.auth().signOut();
            navigation.navigate("Loading");
          },
        }}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={27.5} />
          ),
          tabBarColor: "black"
        }}
      />

    </bottomTab.Navigator>
    

    

    
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
