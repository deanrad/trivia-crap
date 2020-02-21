import React from 'react';
import { trigger } from 'polyrhythm';

export const VoteButton = ({ choice, myAnswer, realAnswer, revealed }) => {
  let displayClass = displayStyle({ choice, myAnswer, realAnswer, revealed });
  return (
    <button
      disabled={revealed || !!myAnswer}
      className={displayClass}
      key={choice}
      onClick={e => {
        trigger('question/answer', { choice });
        e.preventDefault();
      }}
    >
      <h1>{choice}</h1>
    </button>
  );
};

const displayStyle = ({ choice, myAnswer, realAnswer, revealed }) => {
  // they havent answered - no class
  if (!myAnswer) return '';

  // not their answer
  if (myAnswer !== choice) return '';

  if (!revealed && myAnswer === choice) return 'pending';
  if (revealed) return myAnswer === realAnswer ? 'correct' : 'incorrect';
};
