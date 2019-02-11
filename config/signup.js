const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, email, password, done) {
		
		findOrCreateUser = function() {
			console.log('currently HERE IN CODE');
			User.findOne({ 'email': email }, function(err, user) {
				//In case of an error, return using the done method 
				if(err) {
					console.log('Error in Signup: ' + err);
					return done(err);
				}

				//If there is no user with the email entered
				var newUser = User(req.body);

				newUser.save(function(err) {
					if(err) {
						console.log('Error in saving user: ' + err);
						return done(null, false, req.flash('signupMessage', 'The email/username you entered already exists, try again with new credentials.'));
						//throw err;
					}
					console.log('User Registration Successful');
					return done(null, newUser);
				});
			});
		};

		//Delay execution of findOrCreateUser and execute method
		//in the next tick of the event loop
		process.nextTick(findOrCreateUser);
	}));
}

/* Old signup passport Strategy

passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, done) {
	process.nextTick(function() {
		User.findOne({ 'local.email': email }, function(err, user) {
			if(err)
			return done(err);

			if(user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {
				var newUser = new User();

				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				newUser.save(function(err) {
					if(err)
						throw err;
					return done(null, newUser);
				});
			}
		});
	});
}));

*/