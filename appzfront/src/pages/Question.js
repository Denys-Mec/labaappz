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
        <div className={'question-content'} onClick={toggleExpansion}>
          <p>{question}</p>
        </div>
        <button className={`arrow-btn ${isExpanded ? 'expanded-btn' : ''}`} onClick={toggleExpansion}>
        </button>
      </div>
      <div className={'question-details'}>
        {isExpanded && answer && answer.map((q) => (
          <div key={q.id} className="question-expand" onClick={() => toggleSubquestionExpansion(q.id)} style={{ borderTop: "3px solid #31524B" }}>
            <p onChange={(e) => onAnswerChange(q.id, e.target.value)}>
            <button onClick={() => toggleSubquestionExpansion(q.id)}>
              {selectedSubquestion === q.id ? '▲' : '▼'}
            </button>{q.question} 
            {/* <input
              type={'text'}
              value=
             
              readOnly */}
            {/* /> */}
            </p>
            {selectedSubquestion === q.id && (
              <div key={q.id} className="subquestion-expand">
                <p   
                  // value=
                
                  // readOnly
                >{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
