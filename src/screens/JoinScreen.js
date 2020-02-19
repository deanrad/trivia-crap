import React, { useState, useEffect } from 'react';
import { trigger, useListener } from 'polyrhythm';
import { Notyf } from 'notyf';

import 'notyf/notyf.min.css';
const notyf = new Notyf();
const noopListener = () => ['auth/start', () => console.log('auth/start')];

export const JoinScreen = ({
  loggedInUser,
  authUrl,
  authListener = noopListener,
  authStates
}) => {
  const [user, setUser] = useState(loggedInUser);

  // Use the authStates Observable to trigger 'login/change' events
  // as well as update our own state.
  useEffect(() => {
    const sub =
      authStates &&
      authStates.subscribe(user => {
        setUser(user);
        trigger('auth/login', { user });
      });
    return () => sub && sub.unsubscribe();
  }, [authStates]);

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
