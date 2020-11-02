'use strict';

var express = require('express');
require("dotenv").config();
var cryptoRandomString = require('crypto-random-string');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dns = require("dns");

const Url = require("./model");

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.DB_URI);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
  console.log("Connection to DB successful");
});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl/new", async (request, response) => {
  dns.lookup(request.body.url.replace(/https?:\/\//, ""), (error, data) => {
    if (error || request.body.url === "") response.json({ error: "invalid URL" });
    else {
      let url = new Url({
        original_url: request.body.url,
        short_url: cryptoRandomString({ length: 6, type: "url-safe" })
      });

      url.save((error, data) => {
        if (error) response.json({ error: "invalid URL" })
        else response.json({ original_url : data.original_url, short_url: data.short_url });
      });
    };
  });
});

app.get("/api/shorturl/:short", (request, response) => {
  const short = request.params.short;

  Url.findOne({ short_url: short }, (error, data) => {
    console.log(data);
    if (error) response.status(404).json({ "error": "not found" });
    else response.redirect(data.original_url);
  });
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});