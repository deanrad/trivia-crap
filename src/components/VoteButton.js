import React from 'react';
import { trigger } from 'polyrhythm';

export const VoteButton = ({ choice, myChoice, realAnswer, revealed }) => {
  let displayClass = displayStyle({ choice, myChoice, realAnswer, revealed });
  return (
    <button
      disabled={revealed || !!myChoice}
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

const displayStyle = ({ choice, myChoice, realAnswer, revealed }) => {
  // they havent answered - no class
  if (!myChoice) return '';

  // not their answer
  if (myChoice !== choice) return '';

  if (!revealed && myChoice === choice) return 'pending';
  if (revealed) return myChoice === realAnswer ? 'correct' : 'incorrect';
};
