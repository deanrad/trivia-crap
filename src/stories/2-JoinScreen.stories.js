import React from 'react';
import { JoinScreen } from '../screens/JoinScreen';
import '../index.css';

export default {
  title: 'Screens/Join',
  component: JoinScreen
};

export const NotLoggedIn = () => <JoinScreen loggedInUser="" />;

export const LoggedIn = () => <JoinScreen loggedInUser="deanius" />;
