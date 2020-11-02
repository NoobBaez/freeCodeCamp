require("dotenv").config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const User = require("./models/user");
const Exercise = require("./models/exercise");

var mongoose = require('mongoose');
const { response } = require("express")
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on("open", function() { console.log("DB connection succefully") });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//create new user
app.post("/api/exercise/new-user", async (req, res) => {
  const newUser = new User({ username: req.body.username });
  const createdUser = await newUser.save()
  res.json(createdUser);
});

//get all users
app.get("/api/exercise/users", async (req, res) => {
  //await User.deleteMany({});
  const allUsers = await User.find();
  res.json(allUsers);
});

//add exercise

app.post("/api/exercise/add", async (req, res) => {
  const body = req.body;

  const newExercise = new Exercise({
    description: body.description,
    duration: Number(body.duration),
    date: body.date
  });

  try {
    const foundUser = await User.findById(body.userId);
    foundUser.log.push(newExercise);
    const updateUser = await foundUser.save();

    res.json({
      _id: updateUser._id,
      username: updateUser.username,
      duration: newExercise._doc.duration,
      description: newExercise._doc.description,
      date: !newExercise._doc.date 
      ? new Date().toString().slice(0, 15) 
      : new Date(newExercise._doc.date).toString().slice(0, 15)
    });
  } catch (error) {
    res.status(400).json(error._message);
  };
});

app.get("/api/exercise/log", async (req, res) => {
  const { userId, from, to, limit } = req.query;
  
  try {
    let foundUser = await User.findById(req.query.userId);

    let log = foundUser._doc.log;

    if (from) {
      const fromDate = new Date(from);
      log = log.filter( exe => new Date(exe.date) >= fromDate);
    }
  
    if (to) {
      const toDate = new Date(to);
      log = log.filter( exe => new Date(exe.date) <= toDate);
    }

    if (limit) {
    log = log.slice(0, +limit);
    }

    res.json({ 
      userId: foundUser._doc._id, 
      username: foundUser._doc.username, 
      count: log.length, 
      log 
    });

  } catch (error) {
    res.json({ "error": error });
  };

});

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: 'not found' })
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
