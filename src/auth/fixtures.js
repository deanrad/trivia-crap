import { after, trigger, concat } from 'polyrhythm';

// prettier-ignore
export const loggingOut = concat(
    after(0, "Happy User"),
    after(2000, null)
)

// a tuple for giving useListener
// condition, action, combination rule (no double-trigger)
export const simulatedGithubAuth = () => [
  'auth/start',
  () => after(0, () => trigger('auth/login', { user: 'Bram Moolenaar' })),
  { mode: 'mute' }
];

export const player1CookieStates = after(500, 'Player 1');
export const player2CookieStates = after(1000, 'Player 2');
