const uriString = process.env.MONGODB_URI || 'mongodb://localhost/flashapp';
const mongoose = require('mongoose');
var User = require('../models/user');
var newSet = require('../models/set');
var db = mongoose.connection;

module.exports = {
	allSets: function(callback, id) {
		newSet.find({ 'userID': id }, function(err, sets) {
			console.log('WITHIN allSets: ' + sets);
			console.log('length: ' + sets.length);
			
			let setStr = JSON.stringify(sets);

			if(sets) {
				callback(null, setStr);
			}
			else {
				callback(error);
			}
		});
	}
}