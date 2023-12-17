import React, { useState, useEffect, useContext } from 'react';
import { UsernameContext } from '../App';
import axios from 'axios';
const ChatRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [chatLog, setChatLog] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const { username, setUsername } = useContext(UsernameContext);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    const chatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/yustin/`
      );
    const roomNameData = username 
    setRoomName(roomNameData);

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setChatLog((prevChatLog) => prevChatLog + data.message + '\n');
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };
    setChatSocket(chatSocket)
    return () => {
      chatSocket.close();
    };
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    const IsUser = false;
    chatSocket.send(JSON.stringify({
        'message': message,
        'user': IsUser 
    }));
    // // You can update the local state as needed
    // setChatLog((prevChatLog) => prevChatLog + message + '\n');

    // // You can send the message via WebSocket if needed
    // // chatSocket.send(JSON.stringify({ 'message': message, 'user': IsUser }));

    messageInputDom.value = '';
  };

  return (
    <div>
      <textarea id="chat-log" cols="100" rows="20" value={chatLog} readOnly />
      <br />
      <input
        id="chat-message-input"
        type="text"
        size="100"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <br />
      <input
        id="chat-message-submit"
        type="button"
        value="Send"
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default ChatRoom;