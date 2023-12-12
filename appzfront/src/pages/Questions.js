import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Question from '../pages/Question'; 
import '../style/general.css';
import '../style/questions.css';


const Questions = () => {
  const [questionsByTopic, setQuestionsByTopic] = useState({});
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        const data = response.data;
  
        setQuestionsByTopic((prevQuestionsByTopic) => {
          const updatedQuestionsByTopic = { ...prevQuestionsByTopic };
  
          // Use reduce to accumulate questions by topic
          data.results.forEach(q => {
            const topicName = q.topic_name;
  
            if (!updatedQuestionsByTopic[topicName]) {
              updatedQuestionsByTopic[topicName] = [];
            }
  
            // Check if the question with the same ID already exists
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
  
        // If there's a next page, fetch it
        if (data.next) {
          await fetchData(data.next);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Initial API URL
    const apiUrl = 'http://127.0.0.1:8000/api/top_questions/';
    fetchData(apiUrl);
  }, []); // Empty dependency array to run the effect only once
  

  const handleAnswerChange = (topicName, id, value) => {
    setQuestionsByTopic((prevQuestionsByTopic) => ({
      ...prevQuestionsByTopic,
      [topicName]: prevQuestionsByTopic[topicName].map((q) =>
        q.id === id ? { ...q, answer: value } : q
      ),
    }));
  };

  return (
    <div className={'page'}>
      <Navbar />
      <div className={'content'}>
        <Header content={'Допомога'} />
        <div className={'questions-container'}>
          {Object.entries(questionsByTopic).map(([topicName, topicQuestions]) => (
            <Question
              key={topicName}
              id={topicName}
              question={topicName}
              answer={topicQuestions}
              onAnswerChange={(value) => handleAnswerChange(topicName, topicName, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Questions;