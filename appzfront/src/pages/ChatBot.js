import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../style/general.css';
import '../style/chat-bot.css';

const ChatBot = forwardRef(({ inputReadOnly, setInputReadOnly }, ref) => {
  const [messages, setMessages] = useState([
    { text: 'Вітаю! Чим я можу вам допомогти?', isUser: false, display: true },
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
        { text: data.message, isUser: false, display: false },
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
      { text: newMessage, isUser: true, display: true },
    ]);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'До вас буде підключено адміністратора. Будь ласка, зачекайте.', isUser: false, display: true },
    ]);

    chatSocket.send(JSON.stringify({
      'message': newMessage
    }));

    setNewMessage('');
  };

  const getQuestions = async () => {
    try {
      const url = 'http://127.0.0.1:8000/api/top_questions/';
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + sessionStorage.getItem("token")
        },
      });

      const questions = response.data.results;
      console.log(questions)

      const groupedQuestions = questions.reduce((acc, question) => {
        const { topic_name, question: subquestion, answer } = question;

        if (!acc[topic_name]) {
          acc[topic_name] = { topic_name, subquestions: [{ text: subquestion, answers: answer }] };
        } else {
          acc[topic_name].subquestions.push({ text: subquestion,answers: answer});
        }
        return acc;
      }, {});
      console.log(groupedQuestions)
      setMessages((prevMessages) => [
        ...prevMessages,
        ...Object.values(groupedQuestions).map(q => ({
          text: q.topic_name,
          isUser: false,
          display: true,
          subquestions: q.subquestions,
        }))
      ]);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleTopicClick = (topic) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `Ви вибрали тему: ${topic.text}`, isUser: true, display: true},
    ]);

    if (topic.subquestions && Array.isArray(topic.subquestions)) {
      console.log(topic)

      const subquestionMessages = topic.subquestions.map((q) => ({
        text: q.text,
        isUser: false,
        display: true,
        answer: q.answers, // Include the answers for each subquestion
      }));

      setMessages((prevMessages) => [...prevMessages, ...subquestionMessages]);
    }
    else{
      console.log(topic)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: topic.answer, isUser: false, display: true},
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
              {message.text}
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

const ChatBotPage = () => {
  const [inputReadOnly, setInputReadOnly] = useState(true);
  const chatBotRef = useRef();

  const handleToggleInput = () => {
    setInputReadOnly((prevReadOnly) => !prevReadOnly);
  };

  const handleGetQuestions = () => {
    if (chatBotRef.current) {
      chatBotRef.current.getQuestions();
    }
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
          <button className="footer-button" onClick={handleGetQuestions}>Список питань</button>
          <button className="footer-button" onClick={handleToggleInput}>Своє питання</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
