import { filter, on } from 'polyrhythm';
import { Subject } from 'rxjs';
import { persistGame } from './persistence';

/// Store (TODO restore from db upon awakening)
export const store = {
  users: {}
};
// Record a user when Oauth completes
filter('auth/login', (_, { user, displayName, photo }) => {
  store.users[user] = { user, displayName, photo };
});

/////  WebSockets
// Allows importers to push (via next()) events out to all clients
export const outbound = new Subject();

// Broadcast state updates on these received actions
const publishTriggers = () => true;
const persistTriggers = () => true;

on(
  publishTriggers,
  (_, { user, photo = `https://github.com/identicons/${user}.png` }) => {
    user &&
      outbound.next({ type: 'state/users/add', payload: { user, photo } });
  }
);

on(
  persistTriggers,
  () => {
    console.log('Saving game...');

    return persistGame(store);
  },
  { mode: 'serial' }
);
