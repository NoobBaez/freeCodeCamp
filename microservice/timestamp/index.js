const express = require('express');
require("dotenv").config();

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', (_request, response) => {
    const date = new Date();
    response.json({
        unix: Math.round(date.getTime()),
        utc: date.toUTCString()
    });
});

app.get('/api/timestamp/:date', (request, response, next) => {
    const data = request.params.date;

    if (/\d{4}-\d{2}-\d{2}/.test(data)) {
        const date = new Date(data);
        response.json({
            unix: new Number(date),
            utc: `${date.toUTCString()}`
        });
    } else if (!isNaN(new Number(data))) {
        const date = Number.parseInt(data);
        response.json({
            unix: parseInt(data),
            utc: new Date(date).toUTCString()
        });
    };
    next();
});

app.use((_request, response) => {
    response.json({ "error": "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('🚀 Your app is listening on port ' + listener.address().port);
});
