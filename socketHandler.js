import { after, randomId } from 'polyrhythm';
import { share } from 'rxjs/operators';

export const handleSocketConnection = client => {
  const clientId = client.id.substr(0, 6);

  // Open a subscription to store states, bound by this connections life
  console.log(`${clientId}: Got a client connection!`);

  // LEFTOFF Do we use a Raw RxJS
  const whatIShouldPublish = after(1000, {
    type: 'game/players/set',
    payload: [{ user: 'foo' }, { user: 'bar' }]
  }).pipe(share());

  const sub = whatIShouldPublish.subscribe(({ type, payload }) => {
    payload.randomId = randomId();
    console.log(`server>${clientId}: ${type} ${JSON.stringify(payload)}`);
    client.emit('event', { type, payload });
  });

  client.on('event', ({ type, payload }) => {
    const agentId = payload.agentId || clientId;
    console.log(`${agentId}: ${type} ${JSON.stringify(payload)}`);
  });

  client.on('disconnect', () => {
    console.log(`Goodbye client ${clientId}`);
    sub.unsubscribe();
  });
};
