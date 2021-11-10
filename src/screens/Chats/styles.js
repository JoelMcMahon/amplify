import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "white",
  },
  background: {
    backgroundColor: "#181818",
  },
  searchBar: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: "#404040",
    borderRadius: 5,
    width: Dimensions.get("window").width,
    alignSelf: "center",
  },
  userCard: { backgroundColor: "#404040" },
});
export default styles;
