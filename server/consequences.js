import { filter, on } from 'polyrhythm';
import { Subject } from 'rxjs';
import { persistedGame, persistGame } from './persistence';

/////  WebSockets
// Allows importers to push (via next()) events out to all clients
export const outbound = new Subject();

// The servers knowledge of state.
// 1. Loaded from DB on app startup
// 2. Updated on events (filter)
// 3. Saved to DB on events (listener)
let gameState = {};

persistedGame.then(game => {
  Object.assign(gameState, game);

  // Record a user when Oauth completes
  filter('auth/login', ({ payload }) => {
    const {
      user,
      agentId,
      displayName,
      photo = `https://github.com/identicons/${user}.png`
    } = payload;
    gameState.users[user] = {
      user,
      agentId,
      displayName,
      photo,
      joinedAt: Date.now()
    };
  });

  // Broadcast state updates on these received actions
  const publishTriggers = ['auth/login'];
  const persistTriggers = ['auth/login'];

  on(publishTriggers, ({ payload }) => {
    const {
      user,
      photo = `https://github.com/identicons/${user}.png`
    } = payload;
    user && outbound.next({ type: 'game/users/add', payload: { user, photo } });
  });

  on(
    persistTriggers,
    () => {
      console.log('Saving game...');

      return persistGame(gameState);
    },
    { mode: 'serial' }
  );
});
