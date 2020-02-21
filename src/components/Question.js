import React from 'react';
import { VoteButton } from './VoteButton';

export const Question = ({ question, myAnswer, revealed }) => {
  const { prompt, answer } = question;
  return (
    <div>
      <h1>{prompt}</h1>
      {question.choices.map(choice => {
        const props = { choice, myAnswer, realAnswer: answer, revealed };

        return <VoteButton {...props} />;
      })}
    </div>
  );
};
