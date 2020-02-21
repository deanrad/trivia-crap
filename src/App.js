import React from 'react';
import './App.css';
import { JoinScreen } from './screens/JoinScreen';
import { LiveScreen } from './screens/LiveScreen';
import { RemoteScreen } from './screens/RemoteScreen';
import { simulatedGithubAuth } from './auth/fixtures';
import { sendToGithubListener, authUrl, authStates } from './auth';
import { setInitialRoute, Home, Live, Remote } from './routes';
import { storeModel } from './store/index';
import { spy, on, trigger, useEffectAtMount, useListener } from 'polyrhythm';
import { useLocalStore, useObserver } from 'mobx-react-lite';

import io from 'socket.io-client';

const url =
  process.env.NODE_ENV === 'production'
    ? document.location.href.replace(/\/\w+$/, '') // get rid of path
    : 'http://localhost:3001';

const authListener =
  process.env.NODE_ENV === 'production'
    ? sendToGithubListener
    : simulatedGithubAuth;

function App() {
  const store = useLocalStore(storeModel);

  useEffectAtMount(() => {
    spy(({ type, payload }) => console.log(type, payload));
    const socket = io(url);

    socket.on('connect', function() {
      socket.emit('helo', 'helo');
    });

    const socketEvents = ['auth/login'];
    on(socketEvents, ({ type, payload }) => {
      socket.emit('event', { type, payload });
    });

    store.setRoute(setInitialRoute(window));

    Object.assign(window, { socket, trigger, store });
  });

  useEffectAtMount(() => {
    const sub =
      authStates &&
      authStates.subscribe(user => {
        trigger('auth/login', { user });
      });
    return () => sub && sub.unsubscribe();
  });

  useListener('auth/login', ({ payload: { user } }) => {
    store.setUsername(user);
  });

  return useObserver(() => (
    <div className="App">
      {store.route === Home && (
        <JoinScreen
          authListener={authListener}
          authUrl={authUrl}
          loggedInUser={store.username}
        />
      )}
      {store.route === Live && <LiveScreen />}
      {store.route === Remote && <RemoteScreen />}
    </div>
  ));
}

export default App;
