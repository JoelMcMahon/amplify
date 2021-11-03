import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  capture: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f1faee",
  },
  toggleButton: {
    position: "absolute",
    top: 25,
    right: 25,
    backgroundColor: "#2d6a4f",
    padding: 5,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  pressArea: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonColour: {
    color: "white",
  },
  captureButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    height: 80,
    width: 80,

    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: "white",
  },
  icon: {
    fontSize: 40,
  },
});
