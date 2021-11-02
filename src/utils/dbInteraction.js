import { firebase } from "../firebase/config";

export const onLoginPress = (navigation, setUser, email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert("User does not exist anymore.");
            return;
          }
          const user = firestoreDocument.data();
          setUser({ user: user });
          navigation.navigate({ name: "Home", params: user });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};

export const onRegisterPress = (
  navigation,
  fullName,
  email,
  password,
  confirmPassword
) => {
  if (password !== confirmPassword) {
    alert("Passwords don't match.");
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        fullName,
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          const user = firestoreDocument.data();
          setUser({ user: user });
          navigation.navigate({ name: "Home", params: user });
          navigation.navigate("Home", { user: data });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};
