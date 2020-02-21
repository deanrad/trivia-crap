import { Home } from '../routes';

export const storeModel = () => ({
  route: Home,
  setRoute(route) {
    this.route = route;
  },
  username: null,
  setUsername(username) {
    this.username = username;
  }
});
