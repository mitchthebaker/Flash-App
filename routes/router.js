const express = require('express');
const router = express.Router();
var User = require('../models/user');
var newSet = require('../models/set');
var userSetQuery = require('../db/userSetQuery');
const mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = function(passport) {
  
  //GET route for the home page
  router.get('/', (req, res) => res.render('pages/home'));

  //GET route for login page 
  router.get('/login', (req, res) => {
    res.render('pages/login', { message: req.flash('loginMessage') });
  });

  //POST route for login page 
  router.post('/login', passport.authenticate('login', {
      successRedirect: '/profile', //redirects to secure profile section
      failureRedirect: '/login', //redirects back to the login page
      failureFlash: true //Allows flash messages
  }));

  //GET route for signup page
  router.get('/signup', (req, res) => {
    res.render('pages/signup', { message: req.flash('signupMessage')});
  });

  //POST route for signup page 
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/profile', //redirects to the secure profile section
    failureRedirect: '/signup', //redirects back to signup page
    failureFlash: true //allows flash messages 
  }));

  //POST route for the home page, potential data is for users 
  //wishing to register an account.
  /*
  router.post('/', (req, res) => {
    if(req.body.email && 
    	 req.body.username && 
    	 req.body.password && 
    	 req.body.passwordConf) {

      var userData = new User(req.body);

      userData.save((err, user) => {
        if(err) {
          res.send('Something went wrong here..');
          console.log(err);
        }
        else {
        	req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    }
    else if(req.body.logemail && req.body.logpassword) {
    	User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
    		if(error || !user) {
    			let err = new Error('Wrong email or password');
    			err.status = 401;
    			return res.redirect('/');
    		}
    		else {
    			req.session.userId = user._id;
    			return res.redirect('/profile');
    		}
    	});
    }
    else {
    	let err = new Error('All fields must be entered in order to continue.');
    	err.status = 400;
    	return next(err);
    }
  });
  */
   

  router.get('/profile', isLoggedIn, (req, res) => {
    //userSetQuery.allSets(req.user._id);
    userSetQuery.allSets(function(err, data) {
      if(err) {
        return next(err);
      }
      console.log('SET DATA: ' + data);
      console.log(JSON.parse(data));
      console.log(JSON.parse(data)[0]);
      console.log(JSON.parse(data).length);

      //let dataKeys = Object.keys(JSON.parse(data)[0]);
      //let dataValues = Object.values(JSON.parse(data)[0]);
      let dataLength = JSON.parse(data).length;  
      //console.log(dataValues);

      res.render('pages/flashcardAppIndex', {
        user: req.user, //Gets the user out of session and passes the current template 
        data: data,
        length: dataLength
      });
    }, req.user._id);

    /* Previous attempts
    User.findOne({ 'email' : req.user.email }, function(err, user) {
      user.updateOne(
        { sets: { numSets: 0 } },  
        {multi: true}, function(err, numberAffected) {
      });
      
      //var nKeys = Object.keys(user).length;
      //console.log('total number: ' + nKeys);
    });
    */
  });

  /*
  //GET route for after a user registers/logs on
  router.get('/profile', function(req, res) {
  	User.findById(req.session.userId)
  		.exec(function(err, user) {
  			if(err) {
  				return next(err);
  			}
  			else {
  				if(user === null) {
  					let err = new Error('Not authorized! Try again.');
  					err.status = 400;
  					return next(err);
  				}
  				else {
  					res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
  				}
  			}
  		});
  });
  */

  //GET route for flashHome
  router.get('/flashHome', (req, res) => {

    res.render('pages/flashcardAppIndex');

  });

  //GET route for flashCreate
  router.get('/flashCreate', (req, res) => res.render('pages/flashcardAppCreateNewSet'));

  //POST route for flashCreate, potential data is for new sets 
  //created by the user.
  router.post('/flashCreate', async function(req, res) {
    console.log('USER: ' + req.user._id);
    req.body.userID = req.user._id;
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
        console.log(err);
      }
      //res.json(set);
      //res.render('pages/flashcardAppCreateNewSet-success');
    });
  });

  //GET route for flashCreate-success
  router.get('/flashCreate-success', function(req, res) {
      res.render('pages/flashcardAppCreateNewSet-success');
  });

  /* New /logout route

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');  
  });

  */

  //GET route for logging out a user, destroying session and 
  // returning them back to the home page
  router.get('/logout', function(req, res) {
  	if(req.session) {
  		//Deletes the current session object
  		req.session.destroy(function(err) {
  			if(err) {
          console.log('Error: ' + err);
  				return next(err);
  			}
  			else {
          console.log('Logging user out..');
  				return res.redirect('/');
  			}
  		});
  	}
  });

  function isLoggedIn(req, res, next) {
    //if user is authenticated in the session, continue
    if(req.isAuthenticated())
      return next();

    //if they aren't redirect user to the home page
    res.redirect('/');
  }

  return router;
}
  

/* Previous code in index.js for reference:

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
app.post('/', (req, res) => {
  if(req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
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

*/

