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

  const handleAnswer = (answer: Question | any) => {
    if (answer) {
      console.log("pushed answer: ", answer);
      setCurrentQuestion(answer);
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
    let renderedQuestions: Question[] = [];

    if (currentQuestion.question) {
      renderedQuestions.push(currentQuestion) 
    }

    questionKeys.forEach((key) => {
      if (currentQuestion[key]) {
        renderedQuestions.push(currentQuestion[key]);
      }
    });

    return (
      <div>
        {renderedQuestions.map((question, index) => (
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

  return (
    <div>
      {renderQuestions()}
      {result && (
        <div>
          <h2 className="text-xl font-bold">Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;