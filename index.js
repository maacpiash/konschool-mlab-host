const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const Bluebird = require('bluebird');
MongoClient.Promise = Bluebird;

require('dotenv').config();
const URL = 'mongodb://' + process.env.USERNAME + ':' + process.env.PASSWORD + '@ds016138.mlab.com:16138/bdschooldb';

const app = express();
app.use(cors());

app.get('/api/schools', function(req, res) {
  // eslint-disable-next-line no-console
  console.log(new Date(), req.url);
  MongoClient.connect(URL, { useNewUrlParser: true })
    .then(client => client.db())
    .then(db => {
      db.collection('schools').find({}).toArray((err, docs) => {
        if (err) {
          res.error(err);
        } else {
          res.json(docs);
        }
      });
    });
});

app.get('/api/schools/:id', function(req, res) {
  // eslint-disable-next-line no-console
  console.log(new Date(), req.url);
  MongoClient.connect(URL, { useNewUrlParser: true })
    .then(client => client.db())
    .then(db => {
      db.collection('schools').find({'ID': req.params.id}).toArray((err, docs) => {
        if (err) {
          res.error(err);
        } else {
          res.json(docs);
        }
      });
    });
});

const port = process.env.PORT;
// eslint-disable-next-line no-console
app.listen(port, console.log(`Server listening on port ${port}…`));
