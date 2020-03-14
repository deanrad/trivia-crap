import { filter, on } from 'polyrhythm';
import { Subject } from 'rxjs';
import { persistGame } from './persistence';

/// Store (TODO restore from db upon awakening)
const store = {
  users: {}
};

// Record a user when Oauth completes
filter('auth/login', ({ payload }) => {
  const {
    user,
    agentId,
    displayName,
    photo = `https://github.com/identicons/${user}.png`
  } = payload;
  store.users[user] = {
    user,
    agentId,
    displayName,
    photo,
    joinedAt: Date.now()
  };
});

/////  WebSockets
// Allows importers to push (via next()) events out to all clients
export const outbound = new Subject();

// Broadcast state updates on these received actions
const publishTriggers = () => true;
const persistTriggers = () => true;

on(publishTriggers, ({ payload }) => {
  const { user, photo = `https://github.com/identicons/${user}.png` } = payload;
  user && outbound.next({ type: 'game/users/add', payload: { user, photo } });
});

on(
  persistTriggers,
  () => {
    console.log('Saving game...');

    return persistGame(store);
  },
  { mode: 'serial' }
);
