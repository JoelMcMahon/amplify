import { db } from "../firebase/config";

export default getSingleChat = async (roomId, currUser) => {
  //   console.log(currUser);
  const currUserID = currUser.id;
  const msgs = await db
    .doc(`chats/${roomId}`)
    .get()
    .then((docs) => {
      const data = docs.data();
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
  return msgs.reverse();
  console.log(msgs, "<<<<<<msgs");
};
