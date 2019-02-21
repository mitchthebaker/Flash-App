//Main variables for index.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const flash = require('connect-flash');

//Variables for passport, cookies, sessions
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Variables for MongoDB
const mongoose = require('mongoose');
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

/* I will uncomment this portion later if needed 
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
*/

//Create path to public file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));

//Configuring Passport
//const passport = require('./config/passport')(passport);
const passport = require('passport');
app.use(session({
  secret: 'work hard play hard',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
})); //Persistent login sessions
app.use(flash()); // connect-flash is used her to store flash messages into the current session

//Setting up bodyParser, cookieParser, logs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(methodOverride());

//Initialize Passport
var initPassport = require('./config/init');
initPassport(passport);

//Include routes
var routes = require('./routes/router')(passport);
app.use('/', routes);

//Set the view engine to .ejs
app.set('views', path.join(__dirname, 'views'));
  //.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');

//Listen on current PORT
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


