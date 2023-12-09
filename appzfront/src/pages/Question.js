// Question.js
import React, { useState } from 'react';
import '../style/general.css';
import "../style/signin.css"

const Question = ({ id, question, answer, onAnswerChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
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
        {isExpanded && (
          <div className="question-expand" style={{borderTop: "3px solid #31524B"}}>
            <button  >{'▶'}</button>
            <input
              type={'text'}
              value="sdkjslkf"
              onChange={(e) => onAnswerChange(id, e.target.value)}
              readonly
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
