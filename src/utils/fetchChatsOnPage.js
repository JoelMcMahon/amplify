import { db } from "../firebase/config";

export default fetchChatsOnPage = async (roomId, currUserID) => {
  const newMessages = await db
    .doc(`chats/${roomId}`)
    .get()
    .then((doc) => {
      const data = doc.data();
      // console.log(data);
      console.log("fetching data");

      //   console.log(docs.data(), "<<<<<data in singlechat");
      const formattedMessages = data.messages.map((message, index) => {
        const id = () => {
          if (message.senderId === currUserID) {
            return 1;
          } else {
            return 2;
          }
        };
        const formattedTime = new Date(message.createdAt);
        const formattedMessage = {
          _id: index,
          text: message.body,
          createdAt: formattedTime,
          user: {
            _id: id(),
          },
        };
        return formattedMessage;
      });
      return formattedMessages;
    });
  return newMessages.reverse();
};
