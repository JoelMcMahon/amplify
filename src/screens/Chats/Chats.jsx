import React, { useState } from 'react';
import { Text } from 'react-native';
import styles from './styles';
import { Card, Title } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import fetchUsers from '../../Hooks/fetchUsers';
import createChatRoom from '../../utils/createChatRoom';
import getSingleChat from '../../utils/getSingleChat';
import { Avatar, Divider } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

const Chats = ({ navigation, chatArray, usersArray, currUser }) => {
  const { searchStr, setSearchStr } = fetchUsers();
  const [tempMessages, setTempMessages] = useState([]);
  const { displayName } = currUser;

  const imgs = {
    CelinaAd: require('../../../assets/pexels-anna-tarazevich-8479248.jpg'),
    rebelJeff: require('../../../assets/pexels-amine-msiouri-2108813.jpg'),
    Brent123: require('../../../assets/pexels-rodolfo-quirós-1727280.jpg'),
    Brentley86: require('../../../assets/pexels-cottonbro-6503569.jpg'),
    BrendanIam: require('../../../assets/pexels-wendy-wei-1576280.jpg'),
    BrentwoodH: require('../../../assets/pexels-jack-carey-3331904.jpg'),
    McLarry: require('../../../assets/pexels-rodolfo-quirós-1727280.jpg'),
    Ctrlholtdel: require('../../../assets/pexels-nichole-sebastian-3361381.jpg'),
    dave334: require('../../../assets/pexels-anne-mccarthy-6344364.jpg'),
    Emilyb93: require('../../../assets/pexels-cottonbro-6853299.jpg'),
    steveRaw: require('../../../assets/pexels-cottonbro-6503569.jpg'),
  };

  return (
    <ScrollView style={styles.background}>
      <SearchBar
        placeholder="Search"
        value={searchStr}
        onChangeText={(newText) => {
          setSearchStr(newText);
        }}
        style={styles.searchBar}
      />
      {searchStr
        ? usersArray.map((user) => {
            return (
              <Card key={user.id}>
                <Card.Content style={styles.userCard}>
                  <TouchableOpacity
                    style={styles.chatcontainer}
                    onPress={async () => {
                      const newRoomId = await createChatRoom(
                        currUser.id,
                        currUser.displayName,
                        user.id,
                        user.displayName,
                        chatArray
                      );
                      const messages = await getSingleChat(newRoomId, currUser);
                      navigation.navigate({
                        name: 'SingleChat',
                        params: { roomId: newRoomId, messages },
                      });
                      setSearchStr('');
                    }}
                  >
                    <Title style={styles.searchtitle}>
                      <Entypo name="new-message" size={16} color="#FEF4EC" />
                      <Text style={styles.text}>
                        {' '}
                        {`  ${user.displayName}`}{' '}
                      </Text>
                    </Title>

                    <Avatar.Image
                      style={styles.avatar}
                      size={45}
                      source={imgs[user.displayName]}
                    />
                  </TouchableOpacity>
                  <Divider style={styles.divider} />
                </Card.Content>
              </Card>
            );
          })
        : chatArray.map((roomId) => {
            return (
              <Card key={roomId.id} style={styles.card}>
                <Card.Content>
                  <TouchableOpacity
                    style={styles.chatcontainer}
                    onPress={async () => {
                      const messages = await getSingleChat(roomId.id, currUser);

                      navigation.navigate({
                        name: 'SingleChat',
                        params: { roomId: roomId.id, messages },
                      });
                    }}
                  >
                    <Avatar.Image
                      style={styles.avatar}
                      size={45}
                      source={
                        roomId.displayNames[0] === currUser.displayName
                          ? imgs[roomId.displayNames[1]]
                          : imgs[currUser.displayName]
                      }
                    />
                    <Title>
                      <Text styles={styles.text}>
                        {' '}
                        {roomId.displayNames[0] === currUser.displayName
                          ? roomId.displayNames[1]
                          : roomId.displayNames[0]}
                      </Text>
                    </Title>
                  </TouchableOpacity>
                </Card.Content>
              </Card>
            );
          })}
    </ScrollView>
  );
};

export default Chats;
