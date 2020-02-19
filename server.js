console.log('LEFTOFF Server auth');
/** **/
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

/*** Priority 1: Server API routes ******/
app.get('/server/ping', (req, res) => {
  res.status(200).send('server lives');
});

/*** Priority 2: Serve up the client ******/
// In dev, Webpack dev server does this; in prod, serve from static assets
// (See heroku-postbuild)
app.use(express.static(path.join(__dirname, 'build')));

/*** Priority 3: TODO WebSocket socket.io ******/

// Catch all route (doesn't 404 if text/html contenttype unfortunately)
app.get('*', (req, res) => {
  res.status(404).send('Huh ???');
});

http.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
