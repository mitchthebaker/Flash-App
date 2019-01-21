const express = require('express');
const router = express.Router();
var User = require('../models/user');
var newSet = require('../models/set');

//GET route for the home page
router.get('/', (req, res) => res.render('pages/home'));

//POST route for the home page, potential data is for users 
//wishing to register an account.
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
});

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

//GET route for flashHome
router.get('/flashHome', (req, res) => res.render('pages/flashcardAppIndex'));

//GET route for flashCreate
router.get('/flashCreate', (req, res) => res.render('pages/flashcardAppCreateNewSet'));

//POST route for flashCreate, potential data is for new sets 
//created by the user.
router.post('/flashCreate', async function(req, res) {
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

//GET route for flashCreate-success
router.get('/flashCreate-success', function(req, res) {
    res.render('pages/flashcardAppCreateNewSet-success');
});

//GET route for logging out a user, destroying session and 
// returning them back to the home page
router.get('/logout', function(req, res) {
	if(req.session) {
		//Deletes the current session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			}
			else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;

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

