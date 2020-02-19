import { Observable } from 'polyrhythm';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { interval } from 'rxjs';
import Cookies from 'universal-cookie';

export const authCookieName = 'g2-trivia-user';
export const authCheckInterval = 2000;
export const authUrl = document.location.href.includes('localhost')
  ? '//localhost:3001/auth/github'
  : '/auth/github';

// export thing that is distinctUntilChanged and, if listened to,
// every 2000 msec pushes the current value to the subject
export const authStates = new Observable(notify => {
  const cookies = new Cookies();
  console.log('Login cookie-watcher activated');

  const poller = interval(authCheckInterval)
    .pipe(map(() => cookies.get(authCookieName)))
    .subscribe(cookieVal => notify.next(cookieVal));

  return () => poller.unsubscribe();
}).pipe(distinctUntilChanged());

export const sendToGithubListener = authUrl => [
  'auth/start',
  () => {
    window.top.location.href = authUrl;
  }
];
