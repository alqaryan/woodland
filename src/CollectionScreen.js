import 'react-native-gesture-handler';
import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CollectionScreen(){
    return(
      <View style={styles.container}>
          <Text>Collection</Text>
        </View>
    );
  }

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