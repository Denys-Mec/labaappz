import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Question from '../pages/Question'; 
import '../style/general.css';
import '../style/questions.css';


const Questions = () => {
  const [questionsByTopic, setQuestionsByTopic] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem("token")
          },
        });
        console.log(response.data)
        const data = response.data;
  
        setQuestionsByTopic((prevQuestionsByTopic) => {
          const updatedQuestionsByTopic = { ...prevQuestionsByTopic };
  
          data.results.forEach(q => {
            const topicName = q.topic_name;

            if (!updatedQuestionsByTopic[topicName]) {
              updatedQuestionsByTopic[topicName] = [];
            }
  
           
            const existingQuestion = updatedQuestionsByTopic[topicName].find(
              (existingQ) => existingQ.id === q.id
            );
  
            if (!existingQuestion) {
              updatedQuestionsByTopic[topicName].push({
                id: q.id,
                question: q.question,
                answer: q.answer,
              });
            }
          });
  
          return updatedQuestionsByTopic;
        });
  
       
        if (data.next) {
          await fetchData(data.next);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
 
    const apiUrl = 'http://127.0.0.1:8000/api/top_questions/';
    fetchData(apiUrl);
  }, []); 
  

  const handleAnswerChange = (topicName, id, value) => {
    setQuestionsByTopic((prevQuestionsByTopic) => ({
      ...prevQuestionsByTopic,
      [topicName]: prevQuestionsByTopic[topicName].map((q) =>
        q.id === id ? { ...q, answer: value } : q
      ),
    }));
  };

  const filteredQuestionsByTopic = Object.fromEntries(
    Object.entries(questionsByTopic).map(([topicName, topicQuestions]) => [
      topicName,
      topicQuestions.filter((q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    ])
  );
  return (
    <div className={'page'}>
      <Navbar />
      <div className={'content'}>
        <Header content={'Допомога'} />
        <div className={'search-bar'}>
            <input className={'search-input'}
              type="text"
              placeholder="Шукайте питання..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className={'questions-container'}>
          {Object.entries(filteredQuestionsByTopic).map(
            ([topicName, topicQuestions]) => (
              <Question
                key={topicName}
                id={topicName}
                question={topicName}
                answer={topicQuestions}
                onAnswerChange={(value) =>
                  handleAnswerChange(topicName, topicName, value)
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};


export default Questions;