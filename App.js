import 'react-native-gesture-handler';
import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
//import fire from "./src/config/fire.js";
import Home from './src/Home.js';
import SignInScreen from "./src/SignInScreen";
import SignUp from "./src/SignUp";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/LoadingScreen.js';



import * as firebase from "firebase";
//import "firebase/firestore";
//export const firestore = firebase.firestore();



const config = {
  apiKey: "AIzaSyBj-t6ZY9NV6NCGqtMbLLPtsIDe6irFpvo",
    authDomain: "woodland-2.firebaseapp.com",
    databaseURL: "https://woodland-2.firebaseio.com",
    projectId: "woodland-2",
    storageBucket: "woodland-2.appspot.com",
    messagingSenderId: "95338372900",
    appId: "1:95338372900:web:6bba84a73cd545b9db1db1",
    measurementId: "G-RQT43SKPZE"
};
// Initialize Firebase
firebase.initializeApp(config);


//const Stack = createStackNavigator();

const AppStack= createStackNavigator();
const AuthStack= createStackNavigator();
const MainStack= createStackNavigator();

function AppStackScreen(){
  return(
    <AppStack.Navigator backBehavior="none">
      <AppStack.Screen name="Home" component= {Home}  />
    </AppStack.Navigator>
  );

  
}

function AuthStackScreen(){
  return(
    <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component= {SignInScreen}  />
    <AuthStack.Screen name="Register" component= {SignUp}  />
  </AuthStack.Navigator>
  );
}

export default function App() {
    return (
      <NavigationContainer>

        <MainStack.Navigator initialRouteName="Loading" backBehavior='none'>
            <MainStack.Screen name="Loading" component= {LoadingScreen}  />
            <MainStack.Screen name="App" component= {AppStackScreen}  />
            <MainStack.Screen name="Auth" component= {AuthStackScreen}  />
        </MainStack.Navigator>

      </NavigationContainer>
    );
}


