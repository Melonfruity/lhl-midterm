// load .env data
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sass = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');

const dbParams = require('./utils/dbParams');

const app = express();

const PORT = process.env.PORT || 8080;


// database connection
const { Pool } = require('pg');
const db = new Pool(dbParams);
db.connect();

// setting middleware
app.set(morgan('dev'));
app.set(cors());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['userID'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ejs view
app.set('view engine', 'ejs');

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// routes
const rootRouter = require('./routes/root');
const gamesRouter = require('./routes/games');
const roomsRouter = require('./routes/rooms');
const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const dbRouter = require('./routes/db');

// setting routes
app.use('/rooms', roomsRouter(db));
app.use('/api/db', dbRouter(db));
app.use('/api/games', gamesRouter(db));
app.use('/api/users', usersRouter(db));
app.use('/api/tests', testsRouter(db));
app.use('/', rootRouter(db));

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
