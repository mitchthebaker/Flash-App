const login = require('./login');
const signup = require('./signup');
var User = require('../models/user');
var newSet = require('../models/set');

module.exports = function(passport) {

	//To support persistent login sessions, passport needs to serialize/deserialize users
	passport.serializeUser(function(user, done) {
		console.log('serializing user: ' + user);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserializing user: ' + user);
			done(err, user);
		});
	});

	//Setting up passport strategies for login and signup
	login(passport);
	signup(passport);
}





	

