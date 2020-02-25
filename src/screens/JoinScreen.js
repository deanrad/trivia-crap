import React from 'react';
import { trigger } from 'polyrhythm';
import { Notyf } from 'notyf';
import { useListener } from '../useLocalAgent';

import 'notyf/notyf.min.css';
const notyf = new Notyf();
const noopListener = () => ['auth/start', () => console.log('auth/start')];

export const JoinScreen = ({
  loggedInUser,
  authUrl,
  authListener = noopListener
}) => {
  const user = loggedInUser;

  // instantiate our listener
  useListener(...authListener(authUrl));

  useListener('auth/login', (_, { user }) => {
    const msg = user ? `Logged in as ${user}` : 'You have been logged out.';
    notyf.success(msg);
  });
  return user ? (
    <LoggedInJoinScreen username={user} />
  ) : (
    <NotLoggedInJoinScreen authUrl={authUrl} />
  );
};

const NotLoggedInJoinScreen = ({ authUrl }) => {
  return (
    <button onClick={() => trigger('auth/start', { authUrl })}>
      Click here to log in
    </button>
  );
};
const LoggedInJoinScreen = ({ username }) => {
  return <div>Welcome, {username}, the game will begin shortly!</div>;
};
