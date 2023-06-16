'use client'

import React, { useState } from "react";
import questionsData from "../questions.json";


interface Question {
  question: string;
  answers: { [key: string]: any };
  [key: string]: any;
}

const Questionnaire: React.FC = () => {

  const [currentQuestion, setCurrentQuestion] = useState<Question>(questionsData);
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<Question[]>([]);

  const handleAnswer = (answer: Question | any) => {
    if (answer) {
      if (!answer.result) {
        setHistory([...history, answer])        
      }
      setCurrentQuestion(answer)
    }

    if (answer.result) {
      setResult(answer.result);
    }
  };

  const renderQuestions = () => {
    const questionKeys = [
      "question_1",
      "question_2",
      "question_3",
      "question_4"
    ];
    let questions: Question[] = [];

    if (currentQuestion.question) {
      questions.push(currentQuestion) 
    }

    questionKeys.forEach((key) => {
      if (currentQuestion[key]) {
        questions.push(currentQuestion[key]);
      }
    });

    return (
      <div>
        {questions.map((question, index) => (
          <div className="mb-4" key={index}>
            <h2 className="text-xl font-bold">{question.question}</h2>
            <div className="flex mt-3 flex-row-reverse justify-end">
              {Object.entries(question.answers).map(([key, value]) => (
                <button className="btn mr-1" key={key} onClick={() => handleAnswer(value)}>{key}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHistory = (): JSX.Element => {
    return (
      <div className="mt-4">
        <h2>History</h2>
        <ol className="list-decimal">
          {history.map((question, index) => (
            <li key={index}>
              <h3>{
              question.question || 
              question.question_1.question || 
              question.question_2.question || 
              question.question_3.question || 
              question.question_4.question}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  const reset = () => {
    setCurrentQuestion(questionsData)
    setHistory([])
    setResult('')
  }

  const resetButton = (): JSX.Element => {
    return (
      <button className="btn mr-1" onClick={() => reset()}>Reset</button>
    )
  }

  return (
    <div>
      {renderQuestions()}
      {result && (
        <div>
          <h2 className="text-xl font-bold">Result</h2>
          <p>{result}</p>
        </div>
      )}
      {result && (<div className="mt-2">{resetButton()}</div>)}
      {history.length > 0 && (renderHistory())}
    </div>
  );
};

export default Questionnaire;