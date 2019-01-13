const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uriString = process.env.MONGODB_URI || 'mongodb://localhost/flashapp';
const PORT = process.env.PORT || 5001;

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
  term: [String],
  definition: [String]
});
var newSet = mongoose.model('newSet', setSchema);

express()
  .use(bodyParser.json());
  .use(bodyParser.urlencoded({
    extended: false
  }));
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'public/scripts')))
  .set('views', path.join(__dirname, 'views'))
  //.engine('html', require('ejs').renderFile)
  .set('view engine', 'ejs')
  .get('/flashHome', (req, res) => res.render('pages/flashcardAppIndex'))
  .get('/flashCreate', (req, res) => res.render('pages/flashcardAppCreateNewSet'))
  .get('/flashCreate-success', function(req, res) {
    res.render('pages/flashcardAppCreateNewSet-success')
  })
  .post('/flashCreate', async function(req, res) {
    console.log(req.body)
    res.render('pages/flashcardAppCreateNewSet-success', {data: req.body})
  })
  .get('/db', async (req, res) => {
  	try {
  		const client = await pool.connect()
  		const result = await client.query('SELECT * FROM test_table');
  		const results = {
  			'results': (result) ? result.rows : null
  		};

  		res.render('pages/db', results);
  		client.release();
  	}
  	catch (err) {
  		console.error(err);
  		res.send("Error " + err);
  	}
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  const { Pool } = require('pg');
  const pool = new Pool({
  	connectionString: process.env.DATABASE_URL,
  	ssl:true
  });

