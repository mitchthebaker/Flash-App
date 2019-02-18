const mongoose = require('mongoose');

//Create a new Schema model for sets
var setSchema = new mongoose.Schema({
  userID: String,
  setName: String,
  term: String,
  definition: String
}, {strict: false});

var newSet = mongoose.model('newSet', setSchema);
module.exports = newSet;

/*
//Create a new Schema model for sets
var setSchema = new mongoose.Schema({
  setName: String,
  term: String,
  definition: String
}, {strict: false});

var newSet = mongoose.model('newSet', setSchema);
module.exports = newSet;
*/