import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../style/general.css';
import '../style/chat-bot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Вітаю! Чим я можу вам допомогти?', isUser: false, display: true},
  ]);

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
        { text: data.message, isUser: false, display:false },
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

    // Add the user's message to the array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, isUser: true, display:true},
    ]);
    console.log(messages)
    // Add the constant response to the array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'До вас буде підключено адміністратора. Будь ласка зачекайте.', isUser: false, display:true},
    ]);
    // Send the user's message to the WebSocket
    chatSocket.send(JSON.stringify({
      'message': newMessage
    }));

    // Clear the input field
    setNewMessage('');
  };

  return (
    <div className="chat-bot">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => ( message.display && 
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
        <button className="gen-btn" onClick={handleSendMessage}>
          Відправити
        </button>
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
            <Header content={'Чат-бот'} classes={[]} />
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
