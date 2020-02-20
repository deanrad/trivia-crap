export const handleSocketConnection = client => {
    const clientId = client.id.substr(0,6)
    console.log(`${clientId}: Got a client connection!`);
    client.on('helo', () => {
      console.log(`Helo client ${clientId}`);
    });
    client.on('event', ({ type, payload }) => {
      console.log(`${clientId}: ${type} ${JSON.stringify(payload)}`);
    });
    client.on('disconnect', () => {
      console.log(`Goodbye client ${clientId}`);
    });
  }