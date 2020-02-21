import React from 'react';
import { Question } from '../components/Question';

export const PlayerScreen = props => {
  const { revealed, question } = props;
  return (
    <div>
      <h1>Player Screen {revealed && '(revealed)'} </h1>
      {question && <Question {...props} />}
      {!question && <h2>Awaiting the first question</h2>}
    </div>
  );
};
