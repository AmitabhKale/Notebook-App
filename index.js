require('dotenv').config();
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers')
    // pg = require('pg');

var app = express();
const Pool = require('pg').Pool;


// Db connect String...
var connect = "postgres://Amitabh:Amitabh@localhost/notebookdb";

// Assign Dust Engine
app.engine('dust', cons.dust);


//Set DEfault Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname +  '/views');

//set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pool = new Pool({
  user:"postgres",
  password:"root",
  host:"localhost",
  port:"5432",
  database:"notebookdb",
  connectionString: connect
});

app.get('/', function(req,res,next){

  pool.connect( function(err, client, done)  {
  if (err){
   return console.error('error fetching client from pool', err);
 }

  client.query('SELECT * FROM notes' , function(err, result) {
    if (err) {
      return console.error('query error',err);
    }
    res.render('index', {notes : result.rows});
      done()

  })
})
})

  app.post('/add', function(req,res){
    pool.connect( function(err, client, done)  {
    if (err){
     return console.error('error fetching client from pool', err);
   }
      client.query("INSERT INTO notes(name, desciptions, directions) VALUES($1, $2, $3)",
      [req.body.name, req.body.desciptions, req.body.directions]);

      done();
      res.redirect('/');
  });
  });

  app.delete('/delete/:id', function(req, res){
    pool.connect( function(err, client, done)  {
      if (err){
       return console.error('error fetching client from pool', err);
      }
      client.query("DELETE FROM notes WHERE id= $1",
      [req.params.id]);

      done();
      res.sendStatus(200);
    });

  });


  app.post('/edit', function(req,res){
    pool.connect( function(err, client, done)  {
    if (err){
     return console.error('error fetching client from pool', err);
   }
      client.query("UPDATE notes SET name=$1 ,desciptions=$2, directions=$3 WHERE id=$4",
      [req.body.name, req.body.desciptions, req.body.directions, req.body.id]);

      done();
      res.redirect('/');
  });
  })


app.listen(3000, function(){
  console.log("Server is Started on Port 3000");
});
