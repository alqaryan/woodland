import 'react-native-gesture-handler';
import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as firebase from "firebase";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default function LoadingScreen({navigation}) {
  useEffect( () => {
    const authHandler = navigation.addListener('focus', () =>{
        firebase.auth().onAuthStateChanged(user => {
            navigation.navigate(user ? "App" : "Auth");
        });
    });
  });

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    );
}
