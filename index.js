const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5001;
//const app = express(); also works but seems a bit redundant for what I'm doing here

var urlencodedParser = bodyParser.urlencoded({ extended: false });

express()
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
  .post('/flashCreate', urlencodedParser, async function(req, res) {
    console.log(req.body)
    res.render('pages/flashcardAppCreateNewSet-success', {data: req.body})
  })
  .get('/db', async (req, res) => {
  	try {
  		const client = await pool.connect()
  		const result = await client.query('SELECT * FROM test_table')
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

