import fetchUsers from "./fetchUsers";
import useChats from "./useChats";
import useMessages from "./useMessages";

export const testChat = (user) => {
  const { usersArray } = fetchUsers();
  //Fetch chat arrays
  const { chatArray } = useChats(user);
  //Fetch all associated messages
  const messagesObject = useMessages(chatArray, user);

  return { usersArray, chatArray, messagesObject };
};
