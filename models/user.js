const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//Create a new Schema model for Users
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

//Authenticate the current input against users in the database
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email: email })
		.exec(function(err, user) {
			if(err) {
				return callback(err);
			}
			else if(!user) {
				let err = new Error('User not found.');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function(err, result) {
				if(result === true) {
					return callback(null, user);
				}
				else {
					return callback();
				}
			});
		});
}

//Hashing the user's password before data is sent to the database
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

var User = mongoose.model('User', UserSchema);
module.exports = User;

/* Previous code for reference:

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

*/
