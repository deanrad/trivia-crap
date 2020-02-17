import React from 'react';
import { JoinScreen } from '../screens/JoinScreen';
import '../index.css';
import { authCookieName, authStates } from '../auth';
import { loggingOut } from '../auth/fixtures';

export default {
  title: 'Screens/Join',
  component: JoinScreen
};

export const NotLoggedIn = () => (
  <JoinScreen loggedInUser="" authUrl="http://foo.com" />
);

export const LoggedIn = () => <JoinScreen loggedInUser="deanius" />;

export const LiveUpdating = () => (
  <div>
    <JoinScreen authStates={authStates} />
    <p>Play with the cookie "{authCookieName}" to see.</p>
  </div>
);

export const LoggingOut = () => <JoinScreen authStates={loggingOut} />;
