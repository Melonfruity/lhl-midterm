// load .env data
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
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
app.use(express.static('public'));

const apiRouter = require('./routes/api');

// Setting routes
app.use('/api', apiRouter(db));

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
