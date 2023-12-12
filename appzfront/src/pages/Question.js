// Question.js
import React, { useState } from 'react';
import '../style/general.css';
import "../style/questions.css"

const Question = ({ id, question, answer, onAnswerChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSubquestion, setSelectedSubquestion] = useState(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSubquestionExpansion = (subquestionId) => {
    setSelectedSubquestion(selectedSubquestion === subquestionId ? null : subquestionId);
  };

  return (
    <div className={'question'}>
      <div className={'question-item'}>
        <div className={'question-content'}>
          <p>{question}</p>
        </div>
        <div className={'question-expand'}>
          <button onClick={toggleExpansion}>
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      <div className={'question-details'}>
        {isExpanded && answer && answer.map((q) => (
          <div key={q.id} className="question-expand" style={{ borderTop: "3px solid #31524B" }}>
            <button onClick={() => toggleSubquestionExpansion(q.id)}>
              {selectedSubquestion === q.id ? '▲' : '▼'}
            </button>
            <input
              type={'text'}
              value={q.question}
              onChange={(e) => onAnswerChange(q.id, e.target.value)}
              readOnly
            />
            {selectedSubquestion === q.id && (
              <div key={q.id} className="subquestion-expand">
                <input
                  type={'text'}
                  value={q.answer}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  readOnly
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
