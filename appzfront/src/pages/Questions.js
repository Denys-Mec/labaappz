// Questions.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Question from '../pages/Question'; // Import the Question component

const Questions = () => {
  // State to manage questions and their responses
  const [questions, setQuestions] = useState([
    { id: 1, question: 'Реєстрація та вхід в систему', answer: '' },
    { id: 2, question: 'Створення та редагування профілю', answer: '' },
    { id: 3, question: 'Проходження опитувальників', answer: '' },
    { id: 4, question: 'Керування пацієнтами', answer: '' },
    { id: 5, question: 'Аналіз та статистика результатів', answer: '' },
    { id: 6, question: 'Налаштування приватності', answer: '' },
    { id: 7, question: 'Технічна підтримка', answer: '' },
    // Add more questions as needed
  ]);

  // Function to handle changes in the answer input
  const handleAnswerChange = (id, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: value } : q
      )
    );
  };

  return (
    <div className={'page'}>
      <Navbar />
      <div className={'content-page'}>
        <Header content={'Допомога'} />
        {/* Render questions using the Question component */}
        <div className={'questions-container'}>
          {questions.map((q) => (
            <Question
              key={q.id}
              id={q.id}
              question={q.question}
              answer={q.answer}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
