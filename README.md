# G2 Trivia !

That trivia game we played at the end of DevWeek 2020 sure was fun :) Let's rewrite it in modern React in a way that anyone can deploy and customize their own real-time React/MobX/Websocket trivia/review game. `trivia-crap` is a repository that is a porting of [the original](https://github.com/deanius/trilogy-trivia) over to modern React style.

- [React](https://react.js.org/) (with hooks) for declarative UI
- [MobX](https://mobx.js.org/) for state management
- [RxJS](https://rxjs.dev/) for background processes and jobs/async
- [socket.io](https://socket.io/) for websocket events (`emit`/`on`)
- [Polyrhythm](https://deanius.github.io/rx-helper/) for coordination and reactivity (`trigger`/`on{mode}`)
