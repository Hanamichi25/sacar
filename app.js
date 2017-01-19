var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var mosca = require('mosca')

// Connection to DB
mongoose.connect('mongodb://localhost/clients', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json({ type: 'application/*+json' })); 
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

api.route('/clients') 
 .get(ClientCtrl.findAll)
 .post(ClientCtrl.add);

api.route('/clients/:id') 
 .get(ClientCtrl.findById)
 .put(ClientCtrl.update)
 .delete(ClientCtrl.delete);

app.use('/api', api);


// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});
 
var settings = {
  port: 1884
};
 
//here we start mosca
var server = new mosca.Server(settings);
server.on('ready', setup);

var packet = {
  topic: 'presence',
  payload: 'presence2',
  qos: 1,
  retain: false,  
};


server.publish(packet, function() {
  console.log('Message sent');  // it passes by here
});
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
 
// fired whena  client is connected
server.on('clientConnected', function(client) {
  console.log('client connected', client.id );

});
 
// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published : ', packet.payload.toString());
});
 
// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
});
 
// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});
 
// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});
 
// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});