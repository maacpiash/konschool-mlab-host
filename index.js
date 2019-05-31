const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;

require('dotenv').config();
const url = 'https://api.mlab.com/api/1/databases/bdschooldb/collections/schools?';
const apiKey = process.env.APIKEY;

const app = express();
app.use(cors());

app.get('/api/schools', function(req, res) {
  // eslint-disable-next-line no-console
  console.log(new Date().toLocaleString(), req.url, res.statusCode);
  fetch(url + 'apiKey=' + apiKey)
    .then(res => res.text())
    .then(body => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(body);
    });
});

app.get('/api/schools/:id', function(req, res,) {
  // eslint-disable-next-line no-console
  console.log(new Date().toLocaleString(), req.url, res.statusCode);
  const newUrl = url + 'q={"ID":"' + req.params.id + '"}&apiKey=' + apiKey;
  fetch(newUrl)
    .then(res => res.text())
    .then(body => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(body);
    });
});

const port = process.env.PORT;
// eslint-disable-next-line no-console
app.listen(port, console.log(`Server listening on port ${port}…`));
