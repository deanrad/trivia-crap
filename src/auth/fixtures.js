import { after, concat } from 'polyrhythm';

// prettier-ignore
export const loggingOut = concat(
    after(0, "Happy User"),
    after(2000, null)
)
