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
