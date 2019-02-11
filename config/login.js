const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var User = require('../models/user');

module.exports = function(passport) {

	passport.use('login', new LocalStrategy({
    	passReqToCallback: true,
        usernameField: 'logemail',
        passwordField: 'logpassword',
    },
    function(req, email, password, done) { 
    	
        loginUser = function() {
            console.log('here');
            User.findOne({ 'email' : email }, function(err, user) {
                console.log(user);
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in login: ' + err);
                    return done(err);
                }

                // Username does not exist, log the error and redirect back
                if (!user) {
                    console.log('User Not Found with username ' + email);
                    return done(null, false, req.flash('loginMessage', "The email you entered doesn't exist, try again."));                 
                }

                // User exists but wrong password, log the error 
                // !isValidPassword(user, password)
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false, req.flash('loginMessage', 'The password you entered was incorrect, try again.')); // redirect back to login page
                }

                // User and password both match, return user from done method
                // which will be treated like success
                console.log(user);
                return done(null, user);
            });
            /*
            User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
                if(error || !user) {
                    let err = new Error('Wrong email or password');
                    err.status = 401;
                    console.log('Error in login: ' + err);
                    return done(null, false, req.flash('loginMessage', 'User not found.'));
                }
                else if(!user.validPassword(password)) {
                    console.log('Invalid password');
                    return done(null, false, req.flash('loginMessage', 'Invalid Password')); // redirect back to login page
                }
                else {
                    //req.session.userId = user._id;
                    //return res.redirect('/profile');
                    console.log('Current user:' + user);
                    return done(null, user);
                }
            });
            */
        };

        var isValidPassword = function(user, password){
            return bcrypt.compareSync(password, user.password);
        }

        //Delay execution of findOrCreateUser and execute method
        //in the next tick of the event loop
        process.nextTick(loginUser);
    }));
}

/*
        // check in mongo if a user with username exists or not
        User.findOne({ 'email' : email }, function(err, user) {
            console.log(user);
            // In case of any error, return using the done method
            if (err) {
                console.log('Error in login: ' + err);
                return done(err);
            }

            // Username does not exist, log the error and redirect back
            if (!user) {
                console.log('User Not Found with username ' + email);
                return done(null, false, req.flash('loginMessage', 'User not found.'));                 
            }

            // User exists but wrong password, log the error 
            // !isValidPassword(user, password)

            var isValidPassword = function(user, password){
                return bCrypt.compareSync(password, user.password);
            }

            if (!user.validPassword(password)) {
                console.log('Invalid Password');
                return done(null, false, req.flash('loginMessage', 'Invalid Password')); // redirect back to login page
            }

            // User and password both match, return user from done method
            // which will be treated like success
            console.log(user);
            return done(null, user);
        });
        */

