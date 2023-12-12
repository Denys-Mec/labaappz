import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../style/general.css';
import '../style/chat-bot.css';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Вітаю! Чим я можу вам допомогти?', isUser: false },
  ]);
  // function test() {
  //   // axios.post('http://127.0.0.1:8000/api/chat/', { username: 'yustin', password: 'labaappz' }, {
  //   // headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'X-CSRFToken': document.cookie.substring(10)
  //   // },
  //   // })
  //   // .then(response => {
  //   //     console.log(response.data)
  //   // })
  

  // }
  const [newMessage, setNewMessage] = useState('');
  const [chatSocket, setChatSocket] = useState(null);
  
  useEffect(() => {
    
    const socket = new WebSocket(
      'ws://' + '127.0.0.1:8000' + '/ws/chat/' + 'yustin' + '/'
          );
    socket.onopen = function (event) {
      console.log('WebSocket connection opened:', event);
    };

    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, isUser: false },
      ]);
    };

    socket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    socket.onerror = function (error) {
      console.error('WebSocket error:', error);
    };

    setChatSocket(socket);
    // Cleanup the WebSocket connection on component unmount
    return () => socket.close();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !chatSocket) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, isUser: true },
    ]);

    chatSocket.send(JSON.stringify({
      'message': newMessage
    }));

    setNewMessage('');
  };

  return (
    <div className="chat-bot">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? 'user-message' : 'bot-message'}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Напишіть повідомлення..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='gen-btn' onClick={handleSendMessage}>Відправити</button>
        {/* <button className='gen-btn' onClick={test}>Тест</button> */}
      </div>
    </div>
  );
};

const ChatBotPage = () => {
  return (
    <div className={'page'}>
      <Navbar />
      <div className={'content-page'}>
        <div className='content'>
            <Header content={'Чат-бот'} />
            <ChatBot />
        </div>
        <div className="footer">
          <button className="footer-button">Список питань</button>
          <button className="footer-button">Своє питання</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
