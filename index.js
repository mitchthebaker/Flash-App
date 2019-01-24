const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const uriString = process.env.MONGODB_URI || 'mongodb://localhost/flashapp';
const PORT = process.env.PORT || 5001;
const app = express();

mongoose.connect(uriString, (err, res) => {
  if(err) {
    console.log('ERROR connecting to: ' + uriString + '.' + err);
  }
  else {
    console.log('Successfully connected to: ' + uriString);
  }
}, { useNewUrlParser: true });
var db = mongoose.connection;

//Setup for MongoDB ~ displays error if there is an issue, otherwise
// console.logs 'DB ready'
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log('DB ready');
});

//Use sessions to track the login of Users
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//Allow flash() method to be used
app.use(flash());

//Use bodyParser to utilize it's respective methods
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Create path to public file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));

//Include routes
var routes = require('./routes/router');
app.use('/', routes);

//Set the view engine to .ejs
app.set('views', path.join(__dirname, 'views'));
  //.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');

//Listen on current PORT
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


