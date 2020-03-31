import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Alert
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
//import fire from "./config/fire.js";
import * as firebase from "firebase";
import "firebase/firestore";

export default function SettingsScreen({ navigation }) {
  //const Stack = createStackNavigator();

  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const updateEmail = () => {
    const user = firebase.auth().currentUser;

    if (email != "") {
      user
        .updateEmail(email)
        .then(function() {
          console.log("update successful for firebase authorization");
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });

      firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        email: email
      })
      .then(function() {
        alert('Successfully updated your email!')
        console.log("update successful for firestore");
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });
    } else {
      alert("Enter new email");
    }
  };

  const updatePassword = () => {
    const user = firebase.auth().currentUser;

    if (password != "" && password.length >= 6) {
      user
        .updatePassword(password)
        .then(function() {
          alert('Successfully updated your password!');
          console.log("update successful");
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    } else {
      alert("Enter new password (Length must be at least 6)");
    }
  };

  const updateName = () => {
    const user = firebase.auth().currentUser;

    if (firstName != "") {
      // firebase
      //   .auth()
      //   .updateUser(user.uid, {
      //     displayName: firstName
      //   })
      //   .then(function() {
      //     console.log("update successful");
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // let data = {
      //   FSfirstName: firstnamee,
      //   FSemail: emaill
      // };
      firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        fullName: firstName
      })
      .then(function() {
        console.log("update successful");
        alert('Successfully updated your name!');
      })
      .catch(function(error) {
        console.log(error);
        alert(error); 
      });
    } else {
      alert("Enter your name");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.inputTitle}>email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={() => updateEmail()} style={styles.button}>
          <Text style={{ color: "#FFF" }}>Update Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => updatePassword()}
          style={styles.button}
        >
          <Text style={{ color: "#FFF" }}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => updateName()} style={styles.button}>
          <Text style={{ color: "#FFF" }}>Update Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 15
  },

  button: {
    marginTop: 20,
    marginHorizontal: 30,
    backgroundColor: "green",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },

  form: {
    marginBottom: 48,
    marginHorizontal: 30
  }
});
