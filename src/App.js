import React from 'react';
import './App.css';
import { JoinScreen } from './screens/JoinScreen';
import { LiveScreen } from './screens/LiveScreen';
import { RemoteScreen } from './screens/RemoteScreen';
import { simulatedGithubAuth } from './auth/fixtures';
import { sendToGithubListener, authUrl, authCookieStates } from './auth';
import { setInitialRoute, Home, Live, Remote } from './routes';
import { storeModel } from './store/index';
import { useEffectAtMount, agent as defaultAgent } from 'polyrhythm';
import { useLocalAgent, useListener } from './useLocalAgent';
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

function App({  authStates = authCookieStates }) {
  const store = useLocalStore(storeModel);

  const { on, filter, spy, trigger, agentId } = useLocalAgent();

  useEffectAtMount(() => {
    const socket = io(url);
    const publishedEvents = ['auth/login'];

    socket.on('event', ({ type, payload }) => trigger(type, payload));
    socket.on('connect', function(...args) {
      console.info(...args);
    });

    on(publishedEvents, ({ type, payload }) => {
      socket.emit('event', { type, payload });
    });

    store.setRoute(setInitialRoute(window));

    // Dont make the ones who fired trigger need to include this info
    filter(publishedEvents, ({ payload }) => {
      payload.agentId = agentId;
    });

    // Debugging
    spy(({ type, payload }) => console.log(type, payload));
    Object.assign(window, { socket, store });
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
