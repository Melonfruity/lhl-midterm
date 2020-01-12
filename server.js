// load .env data
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sass = require('node-sass-middleware');
const dbParams = require('./utils/dbParams');

const app = express();

const PORT = process.env.PORT || 8080;

// Database connection
const { Pool } = require('pg');
const db = new Pool(dbParams);
db.connect();

// Setting middleware
app.set(morgan('dev'));

app.set('view engine', 'ejs');
app.set(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Routes
const apiRouter = require('./routes/api');
const rootRouter = require('./routes/root');

// Setting routes
app.use('/api', apiRouter(db));
app.use('/', rootRouter);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
