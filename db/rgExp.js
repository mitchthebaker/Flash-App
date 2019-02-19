var User = require('../models/user');
var newSet = require('../models/set');

module.exports = {
	rgExpConv: function(callback, id, setName) {
		newSet.find({ 'userID': id}, function(err, sets) {
			let name_forEach = function() {
				let tempArray = [];
				sets.forEach(function(e) {
					let regExpConv = function(str) {
						return str.replace(/\s+|[,\/]/g, '-');
					}
					tempArray.push(regExpConv(e.setName));
				});
				return tempArray;
			}
			
			for(let i = 0; i < name_forEach().length; i++) {
				if(setName !== name_forEach()[i]) {
					continue;
				}
				else {
					if(sets) {
						callback(null, sets[i]);
					}
					else {
						callback(error);
					}
				}
			}
		});
	}
}