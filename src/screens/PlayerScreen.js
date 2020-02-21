import React from 'react';
import { Question } from '../components/Question';

export const PlayerScreen = props => {
  const { revealed } = props;
  return (
    <div>
      <h1>Player Screen {revealed && '(revealed)'} </h1>
      <Question {...props} />
    </div>
  );
};
