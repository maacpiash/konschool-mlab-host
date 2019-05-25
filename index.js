const http = require('http');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
require('dotenv').config();
const url = 'https://api.mlab.com/api/1/databases/bdschooldb/collections/schools?';
const apiKey = process.env.APIKEY;

http.createServer(function (req, res) {
  // eslint-disable-next-line no-console
  console.log(new Date().toLocaleString(), req.url);
  const items = req.url.split('/');
  res.setHeader('Content-Type', 'application/json');  
  if (items.length === 3) {
    fetch(url + 'apiKey=' + apiKey)
      .then(res => res.text())
      .then(body => {
        res.setHeader('Content-Type', 'application/json');
        res.write(body);
        res.end();
      });
  } else {
    const newUrl = url + 'q={"ID":"' + items[3] + '"}&apiKey=' + apiKey;
    fetch(newUrl)
      .then(res => res.text())
      .then(body => {
        res.setHeader('Content-Type', 'application/json');
        res.write(body);
        res.end();
      });
  }
}).listen(8080);