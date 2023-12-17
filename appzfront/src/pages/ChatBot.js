import '../style/general.css';
import '../style/chat-bot.css';
import axios from "axios";

import { UsernameContext } from '../App';
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle, useContext } from 'react';

const ChatBot = forwardRef(({ inputReadOnly, setInputReadOnly }, ref) => {
    const userAvatar = sessionStorage.getItem("image");
    const botAvatar = sessionStorage.getItem("image");
    const { username, setUsername } = useContext(UsernameContext);
    const timestamp = new Date().toLocaleTimeString();
    const [messages, setMessages] = useState([
      { text: 'Вітаю! Чим я можу вам допомогти?', isUser: false, display: true, timestamp },
    ]);
  
    const [newMessage, setNewMessage] = useState('');
    const [chatSocket, setChatSocket] = useState(null);
  
    useEffect(() => {
      console.log(username)
      const socket = new WebSocket(
        'ws://' + '127.0.0.1:8000' + '/ws/chat/' + username + '/'
      );
      socket.onopen = function (event) {
        console.log('WebSocket connection opened:', event);
      };
  
      socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, isUser: false, display: data.user ? false: true, IsUser: data.user, timestamp},
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
      console.log(username)
      if (newMessage.trim() === '' || !chatSocket) return;
      const timestamp = new Date().toLocaleTimeString();
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, isUser: true, display: true, timestamp  },
      ]);
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'До вас буде підключено адміністратора. Будь ласка, зачекайте.', isUser: false, display: true, timestamp },
      ]);
  
      chatSocket.send(JSON.stringify({
        'message': newMessage,
        'user': true
      }));
  
      setNewMessage('');
    };
  
    const getQuestions = async () => {
      try {
        console.log(username)
        const url = 'http://127.0.0.1:8000/api/top_questions/';
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem("token")
          },
        });
  
        const questions = response.data.results;
  
        const groupedQuestions = questions.reduce((acc, question) => {
          const { topic_name, question: subquestion, answer } = question;
  
          if (!acc[topic_name]) {
            acc[topic_name] = { topic_name, subquestions: [{ text: subquestion, answers: answer }] };
          } else {
            acc[topic_name].subquestions.push({ text: subquestion,answers: answer});
          }
          return acc;
        }, {});
  
        setMessages((prevMessages) => [
          ...prevMessages,
          ...Object.values(groupedQuestions).map(q => ({
            text: q.topic_name,
            isUser: false,
            display: true,
            subquestions: q.subquestions,
            timestamp
          }))
        ]);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    const handleTopicClick = (topic) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Ви вибрали тему: ${topic.text}`, isUser: true, display: true, timestamp},
      ]);
  
      if (topic.subquestions && Array.isArray(topic.subquestions)) {
        const subquestionMessages = topic.subquestions.map((q) => ({
          text: q.text,
          isUser: false,
          display: true,
          answer: q.answers,
          timestamp
        }));
  
        setMessages((prevMessages) => [...prevMessages, ...subquestionMessages]);
      }
      else{
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: topic.answer, isUser: false, display: true, timestamp},
        ]);
      }
    };
  
    useImperativeHandle(ref, () => ({
      getQuestions,
      handleTopicClick,
    }));
  
    return (
      <div className="chat-bot">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (message.display && (
              <div
                key={index}
                className={message.isUser ? 'user-message' : 'bot-message'}
                onClick={() => handleTopicClick(message)}
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
            readOnly={inputReadOnly}
          />
          <button className="gen-btn" onClick={handleSendMessage}>
            Відправити
          </button>
        </div>
      </div>
    );
  });

  export default ChatBot