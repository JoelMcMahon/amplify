import React from 'react';
import { logoutHandler } from '../../utils/dbInteraction';
import style from './style';
import { Button, Text, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { withTheme } from 'react-native-elements';
import { View } from 'react-native';

const ProfilePage = ({ user, setUser, navigation, setIsLoggedIn }) => {
  const { displayName, city } = user;
  const postNavigator = () => {
    navigation.navigate('ProfilePosts');
  };
  const imgs = {
    Celina: require('../../../assets/pexels-anna-tarazevich-8479248.jpg'),
    Jeff: require('../../../assets/pexels-amine-msiouri-2108813.jpg'),
    // Brennan: require('../../../assets/pexels-rodolfo-quirós-1727280.jpg'),
    Larry: require('../../../assets/pexels-rodolfo-quirós-1727280.jpg'),
    Ctrlholtdel: require('../../../assets/pexels-nichole-sebastian-3361381.jpg'),
    Dave: require('../../../assets/pexels-anne-mccarthy-6344364.jpg'),
    Emilyb93: require('../../../assets/pexels-cottonbro-6853299.jpg'),
    Steve: require('../../../assets/pexels-cottonbro-6503569.jpg'),
  };
  const imgSource = imgs[displayName];

  return (
    <View style={style.container}>
      <LinearGradient
        colors={['#252525', '#181818']}
        style={style.background}
      />

      <View style={style.profilecard}>
        <LinearGradient
          style={style.profilegradient}
          colors={['#252525', '#181818']}
          style={style.background}
        />
        <Avatar.Image style={style.shadow} size={120} source={imgSource} />

        <View style={style.profiledetails}>
          <Text style={style.username}>{displayName}</Text>
          <Text style={style.city}> {city}</Text>

          <Button
            style={style.logoutbutton}
            theme={{ colors: { primary: '#252525' } }}
            color={'#909090'}
            mode="outlined"
            onPress={() => {
              logoutHandler(setUser, setIsLoggedIn);
            }}
          >
            Logout
          </Button>
        </View>
      </View>
      <Button
        style={(style.button, style.shadow)}
        mode="contained"
        onPress={postNavigator}
      >
        Posts
      </Button>
    </View>
  );
};

export default withTheme(ProfilePage);
