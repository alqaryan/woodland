import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native-gesture-handler";
//import fire from "./config/fire.js";
import * as firebase from "firebase";
const Stack = createStackNavigator();

export default function SignInScreen({ navigation }) {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    function login(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            setErrorMessage(error.message);
            console.log(error.message);
        }
            
            );
    };

    
    

    
  
    return (

        <View style={styles.container}> 
            
            
            <Text style={styles.greeting}>
                {'Welcome to Woodland!\n Sign In to discover'}
            </Text>
            
            
            <View style={styles.errorMessage}>
                <Text></Text>
            </View>

            <View style={styles.form}>

                <View>
                    <Text style={styles.inputTitle}>
                        Email Address
                    </Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>
                        Password
                    </Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            
            
            <TouchableOpacity 
                onPress={() => login(username, password)}
                style={styles.button}
            >
                <Text style={{color: "#FFF", fontWeight:"500"}}>
                    Sign in
                </Text>
            </TouchableOpacity>


            <TouchableOpacity 
                onPress={ () => navigation.navigate("Register")}
                style={{alignSelf: "center", marginTop:32}}
            >
                
                <Text style={{color : "#414959" , fontSize: 13}}>
                    New Explorer? <Text style={{color: "orange", fontWeight: "500"}}>Sign up</Text> 
                </Text>
            </TouchableOpacity>
            
    </View>
    
        
      );
  
   
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  greeting: {
      marginTop:32,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center"
  },

  errorMessage: {
      height: 72,
      alignItems: 'center',
      justifyContent: "center",
      marginHorizontal: 30
  },

  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },

  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },

  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    color: "#8A8F9E",
    fontSize: 15,
    
  },

  button: {
    marginHorizontal: 30,
    backgroundColor: "green",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },





});
