var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var firebase = require("firebase");


// Connection to DB
mongoose.connect('mongodb://localhost/clients', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

firebase.initializeApp({
  serviceAccount: "./sacar/sacar-bbf8d59f15e9.json",
  databaseURL: "https://sacar-bc524.firebaseio.com/"
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/*+json' })); 
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/client.js')(app, mongoose);
var ClientCtrl = require('./controllers/client.js');
var router = express.Router();



// Index - Route
router.get('/', function(req, res) { 
 res.send("Hola Mundo - www.programacion.com.py");
});

app.use(router);

// API routes
var api = express.Router();

// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});

api.route('/clients') 
 .get(ClientCtrl.findAll)
 .post(ClientCtrl.add);

api.route('/clients/:id') 
 .get(ClientCtrl.findById)
 .put(ClientCtrl.update)
 .delete(ClientCtrl.delete);


app.use('/api', api);


