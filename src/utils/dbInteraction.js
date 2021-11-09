import { firebase } from "../firebase/config";

export const onLoginPress = (
  navigation,
  setUser,
  email,
  password,
  setIsLoggedIn
) => {
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
          setIsLoggedIn(true);
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};

export const logoutHandler = (setUser, setIsLoggedIn) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      setIsLoggedIn(false);
      setUser({
        displayName: "",
        email: "",
        fullName: "",
        id: "",
      });
    })
    .catch((err) => console.dir(err));
};
