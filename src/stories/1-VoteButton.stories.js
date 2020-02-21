import React from 'react';
import { VoteButton } from '../components/VoteButton';
import '../index.css';

export default {
  title: 'Components/Vote Button',
  component: VoteButton
};

export const Unanswered = () => <VoteButton choice="/api/tables/1" />;

export const MyAnswer = () => (
  <VoteButton choice="/api/tables/1" myAnswer={'/api/tables/1'} />
);

export const NonAnswer = () => (
  <VoteButton choice="/api/tables/2" myAnswer={'/api/tables/1'} />
);

export const RevealedAndCorrect = () => (
  <VoteButton
    choice="/api/tables/2"
    myAnswer={'/api/tables/2'}
    realAnswer="/api/tables/2"
    revealed={true}
  />
);

export const RevealedAndWrong = () => (
  <VoteButton
    choice="/api/tables/2"
    myAnswer={'/api/tables/2'}
    realAnswer="/api/tables/1"
    revealed={true}
  />
);

export const RevealedAndUnanswered = () => (
  <VoteButton
    choice="/api/tables/2"
    myAnswer={'/api/tables/1'}
    realAnswer="/api/tables/1"
    revealed={true}
  />
);
