import React, { useState, useEffect} from "react";
import { Alert, StyleSheet, Text, View, TextInput, Button, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native-gesture-handler";
//import fire from "./config/fire.js";
import * as firebase from "firebase";

export default function SignUp({navigation}) {
  //const Stack = createStackNavigator();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [date, setDate] = useState(new Date(1598051730000));
    const [errorMessage, setErrorMessage] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      };

    const signup = (emaill, passwordd) => {
      firebase.auth().createUserWithEmailAndPassword(emaill, passwordd)
      .then((u) => {
          console.log("successful signup");
      })
      .catch((err) => {
          console.log("Error: " + err.toString());
          alert(err.message);
      })
      navigation.navigate('Auth');
    }

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={{marginTop: 32}}>
              <Text style={styles.inputTitle}>First Name</Text>
              <TextInput style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
              />
          </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.inputTitle}>Last Name</Text>
              <TextInput style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.inputTitle}>UserName</Text>
              <TextInput style={styles.input}
                  value={username}
                  onChangeText={setUsername}
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.inputTitle}>email</Text>
              <TextInput style={styles.input}
                  value={email}
                  onChangeText={setEmail}
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.inputTitle}>verify email</Text>
              <TextInput style={styles.input}
                  value={verifyEmail}
                  onChangeText={setVerifyEmail}
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={styles.inputTitle}>verify Password</Text>
              <TextInput style={styles.input}
                  value={verifyPassword}
                  onChangeText={setVerifyPassword}
                  secureTextEntry
              />
            </View>

              <TouchableOpacity
                onPress={() => signup(email, password)}
                style={styles.button}
              >
                <Text style={{color: "#FFF"}}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={ () => navigation.navigate("SignIn")}
                  style={{alignSelf: "center", marginTop:15}}
              >
                  <Text style={{color : "#414959" , fontSize: 15}}>
                      Already have an account? <Text style={{color: "orange", fontWeight: "500"}}>Sign in</Text>
                  </Text>
              </TouchableOpacity>
        </View>
    </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 20,
    marginHorizontal: 30,
    backgroundColor: "#80bf98",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },

  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
});
