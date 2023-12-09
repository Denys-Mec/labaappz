import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../style/general.css';
import '../style/chat-bot.css'; 

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Вітаю! Чим я можу вам допомогти?', isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
  
    // Use a functional update to correctly update based on the current state
    setMessages(prevMessages => [
      ...prevMessages,
      { text: newMessage, isUser: true },
      { text: 'Звісно, я бот!', isUser: false },
    ]);
  
    // Clear input
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
        <button className='chat-bot-button' onClick={handleSendMessage}>Відправити</button>
      </div>
    </div>
  );
};

const ChatBotPage = () => {
  return (
    <div className={'page'}>
      <Navbar />
      <div className={'content'}>
            <Header content={'Чат-бот'} />
            <ChatBot />
        </div>
        <div className="footer">
        <button className="footer-button">Список питань</button>
        <button className="footer-button">Своє питання</button>
      </div>
    </div>
  );
};

export default ChatBotPage;
