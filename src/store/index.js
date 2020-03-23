import { Home } from '../routes';

export const storeModel = () => ({
  route: Home,
  setRoute(route) {
    this.route = route;
  },
  username: null,
  setUsername(username) {
    this.username = username;
  },
  users: {},
  game: {},
  questions: [],
  get usernames() {
    return Object.keys(this.users);
  },
  get currentRound() {
    const question = this.questions[this.game.roundNum];
    return question ? { ...question } : null;
  }
});
