import mongoose from 'mongoose';
import { randomId } from 'polyrhythm';

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

const seedGame = {
  gameId: 'g2-trivia',
  randomId: randomId(),
  users: {}
};

export const persistedGame = dbConnected.then(() =>
  Game.findOne({ gameId: 'g2-trivia' }).then(game => {
    if (game) {
      return game._doc;
    } else {
      return Game.create(seedGame).then(() => seedGame);
    }
  })
);

export const persistGame = game => {
  return dbConnected.then(() => {
    Game.updateOne(
      { gameId: 'g2-trivia' },
      { gameId: 'g2-trivia', ...game },
      { upsert: true }
    )
      .then(() => console.log('mongo: persisted game'))
      .catch(e => console.error(`mongo:error ${e}`));
  });
};
