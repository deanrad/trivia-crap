import React from 'react';
import { JoinScreen } from '../screens/JoinScreen';
import '../index.css';
import {
  authCookieName,
  authStates,
  authUrl,
  sendToGithubListener
} from '../auth';
import { loggingOut, simulatedGithubAuth } from '../auth/fixtures';
import { named } from './utils';

export default {
  title: 'Screens/Join',
  component: JoinScreen
};

export const NotLoggedIn = () => <JoinScreen loggedInUser="" />;

export const LoggedIn = () => <JoinScreen loggedInUser="deanius" />;

export const LiveUpdating = () => (
  <div>
    <JoinScreen authStates={authStates} />
    <p>Play with the cookie "{authCookieName}" to see.</p>
  </div>
);

export const LoggingOut = () => <JoinScreen authStates={loggingOut} />;

export const MockLogin = named('Login:Mock', () => (
  <JoinScreen authListener={simulatedGithubAuth} />
));
export const RealLogin = named('Login:Real', () => (
  <JoinScreen authListener={sendToGithubListener} authUrl={authUrl} />
));
