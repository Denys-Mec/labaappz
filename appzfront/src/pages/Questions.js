// Questions.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Question from '../pages/Question'; 
import '../style/general.css';
import "../style/questions.css"
import axios from 'axios';
import { useEffect } from 'react';
const Questions = () => {
  const [questionsByTopic, setQuestionsByTopic] = useState({});

  // axios.get('http://127.0.0.1:8000/api/top_questions/')
  // .then(response => {
  //   console.log(response.data)
  // })
  // .catch(error => console.error('Error:', error));
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/top_questions/')
      .then(response => {
        console.log(response.data);

        // Organize questions by topic_name
        const updatedQuestionsByTopic = {};

        response.data.results.forEach(q => {
          const topicName = q.topic_name;

          if (!updatedQuestionsByTopic[topicName]) {
            updatedQuestionsByTopic[topicName] = [];
          }

          updatedQuestionsByTopic[topicName].push({
            id: q.id,
            question: q.question,
            answer: q.answer,
          });
        });

        setQuestionsByTopic(updatedQuestionsByTopic);
        console.log(updatedQuestionsByTopic)
      })
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array to run the effect only once

  // // State to manage questions and their responses
  // const [questions, setQuestions] = useState([
  //   { id: 1, question: 'Реєстрація та вхід в систему', answer: '' },
  //   { id: 2, question: 'Створення та редагування профілю', answer: '' },
  //   { id: 3, question: 'Проходження опитувальників', answer: '' },
  //   { id: 4, question: 'Керування пацієнтами', answer: '' },
  //   { id: 5, question: 'Аналіз та статистика результатів', answer: '' },
  //   { id: 6, question: 'Налаштування приватності', answer: '' },
  //   { id: 7, question: 'Технічна підтримка', answer: '' },
  //   // Add more questions as needed
  // ]);

  // Function to handle changes in the answer input
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
        {/* Render questions using the Question component */}
        <div className={'questions-container'}>
          {Object.entries(questionsByTopic).map(([topicName, topicQuestions]) => (
            <Question
              key={topicName}
              id={topicName}  // Use topicName as the ID
              question={topicName}  // Use topicName as the question
              answer={topicQuestions}  // Use topicQuestions as the answer (subquestions)
              onAnswerChange={(value) => handleAnswerChange(topicName, topicName, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Questions;
