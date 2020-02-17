import React, { useState, useEffect } from 'react';
import { trigger } from 'polyrhythm';

export const JoinScreen = ({ loggedInUser, authUrl, authStates }) => {
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
