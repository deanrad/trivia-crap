import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import _http from 'http';
import _io from 'socket.io';
import { handleSocketConnection } from './socketHandler';
import { validRoutes } from './src/routes';

const PORT = process.env.PORT || 3001;
const app = express();
const http = _http.Server(app);
const io = _io.listen(http);

// From the settings page: https://github.com/settings/applications/614725
const GITHUB_CLIENT_ID = '37dabf371fa04f10829f';
const GITHUB_CLIENT_SECRET = '6993702cd42d11cfc26acba327ced7390a879cda';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

/*** Priority 1: Server API routes ******/
app.get('/server/ping', (req, res) => {
  res.status(200).send('server lives');
});

/*** Priority 2: Serve up the client ******/
// In dev, Webpack dev server does this; in prod, serve from static assets
// (See heroku-postbuild)
app.use(express.static(path.join(__dirname, 'build')));
validRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
});

/*** Priority 3: TODO WebSocket socket.io ******/
io.on('connection', handleSocketConnection);
/*** Priority 4: Set up passport OAuth ******/

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
const callbackURL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.HOST_URI}/auth/github/callback`
    : 'http://localhost:3001/auth/github/callback';

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      const { username, displayName } = profile;
      console.log(`Logged in ${username} ${displayName}`);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['read:user'] }),
  (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.cookie('g2-trivia-user', req.user.username);
    // TODO upsert record with username, photo, etc..
    res.redirect(
      process.env.NODE_ENV === 'production' ? '/' : '//localhost:3000/'
    );
  }
);
// Catch all route (doesn't 404 if text/html contenttype unfortunately)
app.get('*', (req, res) => {
  res.status(404).send('Huh ???');
});

// Finally run it all
http.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
