const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use('/api', routes);

module.exports = app;
