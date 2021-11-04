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
          console.log(user);
          setUser({ user: user });
          // navigation.navigate({ name: "Home", params: user });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};

export const logoutHandler = (setUser) => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      setUser(null);
    })
    .catch((err) => console.dir(err));
};
