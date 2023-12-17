import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../style/general.css';
import '../style/chat-bot.css';
import ChatBot from './ChatBot';
const ChatBotPage = () => {
  const [inputReadOnly, setInputReadOnly] = useState(true);
  const chatBotRef = useRef();

  const handleToggleInput = (param) => {
    setInputReadOnly(param);
  };

  const handleGetQuestions = (param) => {
    if (chatBotRef.current) {
      chatBotRef.current.getQuestions();
    }
    handleToggleInput(param)
  };

  return (
    <div className={'page'}>
      <Navbar />
      <div className={'content-page'}>
        <div className='content'>
          <Header content={'Чат-бот'} />
          <ChatBot ref={chatBotRef} inputReadOnly={inputReadOnly} setInputReadOnly={setInputReadOnly} />
        </div>
        <div className="footer">
          <button className="footer-button" onClick={() => handleGetQuestions(true)}>Список питань</button>
          <button className="footer-button" onClick={() => handleToggleInput(false)}>Своє питання</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;