import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function HomeScreen({ user, setUser }) {
  const logoutHandler = () => {
    setUser(null);
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
