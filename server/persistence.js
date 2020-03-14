import mongoose from 'mongoose';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/g2-trivia';

const dbConnected = new Promise((resolve, reject) => {
  console.log('Connecting to ' + mongoUri.replace(/[^:]+@/, 'XXXXX@'));
  const db = mongoose.connection;
  db.once('open', () => {
    console.log('Connected!');
    resolve(db);
  });
  db.on('error', e => reject(e));
  mongoose
    .connect(mongoUri, {
      socketTimeoutMS: 2000,
      keepAlive: true,
      reconnectTries: 2
    })
    .catch(reject);
});

const schema = new mongoose.Schema({}, { strict: false });
const Game = mongoose.model('Game', schema);

export const persistGame = game => {
  return dbConnected.then(() => {
    Game.updateOne(
      { id: 'g2-trivia' },
      { id: 'g2-trivia', ...game },
      { upsert: true }
    )
      .then(() => console.log('mongo: persisted game'))
      .catch(e => console.error(`mongo:error ${e}`));
  });
};
