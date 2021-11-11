import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import Capture from "./screens/Capture";
import ConfirmMedia from "./screens/ConfirmMedia";
import Form from "./screens/Form";

const Stack = createStackNavigator();

const NewPostNav = ({ user, setUpdateMap }) => {
  const [media, setMedia] = useState({ type: null, uri: null });
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="Form">
        {(props) => (
          <Form
            {...props}
            media={media}
            setMedia={setMedia}
            user={user}
            setUpdateMap={setUpdateMap}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Capture">
        {(props) => <Capture {...props} setMedia={setMedia} />}
      </Stack.Screen>
      <Stack.Screen name="ConfirmMedia">
        {(props) => (
          <ConfirmMedia {...props} media={media} setMedia={setMedia} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NewPostNav;
