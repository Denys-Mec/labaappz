import React, { useState, useEffect, useContext } from 'react';
import { UsernameContext } from '../App';
import axios from 'axios';
import '../style/chat-bot.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const ChatRoom = () => {
  const userAvatar = sessionStorage.getItem("image");
  const botAvatar = sessionStorage.getItem("image");
  const timestamp = new Date().toLocaleTimeString();
  const [roomName, setRoomName] = useState('');
  const { username, setUsername } = useContext(UsernameContext);
  const [chatSocket, setChatSocket] = useState(null);
  const [messages, setMessages] = useState([
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log(messages)
    const chatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/yustin/`
      );
    const roomNameData = username 
    setRoomName(roomNameData);

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, isUser: true, display: true,   timestamp},
      ]);
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };
    setChatSocket(chatSocket)
    return () => {
      chatSocket.close();
    };
  }, [messages]); 


  const handleSendMessage = () => {
    console.log(messages)
    const IsUser = false;
    chatSocket.send(JSON.stringify({
        'message': newMessage,
        'user': IsUser 
    }));

    setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, isUser: false, display: true, timestamp  },
      ]);

    // messageInputDom.value = '';
  };

//   return (
//     <div>
//       <textarea id="chat-log" cols="100" rows="20" value={chatLog} readOnly />
//       <br />
//       <input
//         id="chat-message-input"
//         type="text"
//         size="100"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <br />
//       <input
//         id="chat-message-submit"
//         type="button"
//         value="Send"
//         onClick={handleSendMessage}
//       />
//     </div>
//   );
  return (
    <div className={'page'}>
    <Navbar />
    <div className={'content-page'}>
      <div className='content'>
        <Header content={'Чат-бот'} />
        <div className="chat-bot">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (message.display && (
            <div
              key={index}
              className={message.isUser ? 'user-message' : 'bot-message'}
              style={{ cursor: 'pointer' }}
            >
              <div className="message-container">
                {message.isUser ? (
                  <>
                    <div className='text-container'>
                      {message.text}
                      {message.timestamp && <div className="timestamp">{message.timestamp}</div>}
                    </div>
                    <img className="avatar" src={userAvatar} alt={"avatar"} />
                  </>
                ) : (
                  <>
                    <img className="avatar" src={botAvatar} alt={"avatar"} />
                    <div className='text-container'>
                      {message.text}
                      {message.timestamp && <div className="timestamp">{message.timestamp}</div>}
                    </div>
                  </>
                )}
              </div>
            </div>
          )))}
        </div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Напишіть повідомлення..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="gen-btn" onClick={handleSendMessage}>
          Відправити
        </button>
      </div>
    </div>
      </div>
    </div>
  </div>
  );
};

export default ChatRoom;