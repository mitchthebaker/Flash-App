const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
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

var setSchema = new mongoose.Schema({
  setName: String,
  term: String,
  definition: String
}, {strict: false});
var newSet = mongoose.model('newSet', setSchema);

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    requried: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});
UserSchema.pre('save', function(next) {
  var user = this;
      
  if(!user.isModified('password')) {
    return next();
  }   

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
}
var User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.set('views', path.join(__dirname, 'views'));
  //.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.get('/flashHome', (req, res) => res.render('pages/flashcardAppIndex'));
app.get('/flashCreate', (req, res) => res.render('pages/flashcardAppCreateNewSet'));
app.get('/flashCreate-success', function(req, res) {
    res.render('pages/flashcardAppCreateNewSet-success');
});
app.post('/flashCreate', async function(req, res) {
    let set = new newSet(req.body);
    let setLength = Object.keys(req.body).length;  
    let setKeys = Object.keys(req.body);
    let setValues = Object.values(req.body);
  
    set.save((err) => {
      if(!err) {  
        res.render('pages/flashcardAppCreateNewSet-success', {
          data: set,
          keys: setKeys,
          values: setValues,
          length: setLength   
        });
      }
      else {
        res.send('Something went wrong here..');
        next();
      }
      //res.json(set);
      //res.render('pages/flashcardAppCreateNewSet-success');
    });
    
});
app.get('/', (req, res) => res.render('pages/home'));
app.post('/login', (req, res) => {
  if(req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    /*
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };

    User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.json(user);
    }
    });
    */
    var userData = new User(req.body);

    userData.save((err, user) => {
      if(err) {
        res.send('Something went wrong here..');
        console.log(err);
      }
      else {
        //return res.redirect('/profile');
        res.json(user);
      }
    });
  }
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


