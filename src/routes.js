export const Live = '/live';
export const Remote = '/remote';
export const Home = '/';

export const validRoutes = [Live, Remote, Home];
const defaultRoute = Home;

const routeTitles = {
  [Live]: 'G2 Trivia Live',
  [Remote]: 'G2 Trivia - Remote',
  [Home]: 'G2 Trivia'
};

const routeFor = path => {
  return validRoutes.includes(path.toLowerCase())
    ? path.toLowerCase()
    : defaultRoute;
};

export const setInitialRoute = window => {
  const destRoute = routeFor(window.location.pathname);
  if (destRoute !== window.location.pathname) {
    window.history.pushState(null, routeTitles[destRoute], destRoute);
  }
  return destRoute;
};
