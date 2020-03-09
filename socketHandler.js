import { randomId, trigger, filter, on } from 'polyrhythm';
import { Subject } from 'rxjs';

const outbound = new Subject();

// For these event types, a state update will be broadcast
// after the event is reduced into the store
const publishTriggers = ['auth/login'];

const store = {
  users: []
};

filter('github/login', (_, { user, displayName, photo }) => {
  store.users.push({ user, displayName, photo });
});
on(
  publishTriggers,
  (_, { user, photo = `https://github.com/identicons/${user}.png` }) => {
    user &&
      outbound.next({ type: 'state/users/add', payload: { user, photo } });
  }
);

export const handleSocketConnection = client => {
  const clientId = client.id.substr(0, 6);

  // Open a subscription to store states, bound by this connections life
  console.log(`${clientId}: Got a client connection!`);

  const sub = outbound.subscribe(({ type, payload }) => {
    payload.randomId = randomId();
    console.log(`server>${clientId}: ${type} ${JSON.stringify(payload)}`);
    client.emit('event', { type, payload });
  });

  client.on('event', ({ type, payload }) => {
    const agentId = payload.agentId || clientId;
    console.log(`${agentId}: ${type} ${JSON.stringify(payload)}`);
    trigger(type, payload);
  });

  client.on('disconnect', () => {
    console.log(`Goodbye client ${clientId}`);
    sub.unsubscribe();
  });
};
