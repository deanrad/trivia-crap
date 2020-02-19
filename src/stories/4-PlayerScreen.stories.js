import React from 'react';
import { PlayerScreen } from '../screens/PlayerScreen';

export default {
  title: 'Screens/Player',
  component: PlayerScreen
};

export const Unanswered = () => <PlayerScreen />;
export const Answered = () => <PlayerScreen />;
export const Revealed = () => <PlayerScreen />;
