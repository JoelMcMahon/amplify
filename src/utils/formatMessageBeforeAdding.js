export default function formatMessageBeforeAdding(messageBody, newIndex) {
  const formattedMessage = {
    _id: newIndex,
    text: messageBody,
    createdAt: Date.now(),
    user: {
      _id: 2,
    },
  };
  return formattedMessage;
}
