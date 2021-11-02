import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function HomeScreen({ user, setUser }) {
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log(res);

        setUser(null);
      })
      .catch((err) => console.dir(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={logoutHandler}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
