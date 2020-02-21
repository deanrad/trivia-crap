import React from 'react';
import { PlayerScreen } from '../screens/PlayerScreen';
import * as Q from '../question/fixtures';

export default {
  title: 'Screens/Player',
  component: PlayerScreen
};

export const Unanswered = () => <PlayerScreen question={Q.apiQuestion} />;
export const Answered = () => (
  <PlayerScreen myAnswer={Q.apiQuestion.answer} question={Q.apiQuestion} />
);
export const RevealedCorrect = () => (
  <PlayerScreen
    revealed={true}
    myAnswer={Q.apiQuestion.answer}
    question={Q.apiQuestion}
  />
);
export const RevealedWrong = () => (
  <PlayerScreen
    revealed={true}
    myAnswer={'/api/c/3'}
    question={Q.apiQuestion}
  />
);
export const NoQuestion = () => <PlayerScreen />;
