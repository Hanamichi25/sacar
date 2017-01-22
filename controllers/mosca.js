var mosca = require('mosca')
var contMessage = 0;
var mensaje;
var settings = {
  port: 1884
};
 
//here we start mosca
var server = new mosca.Server(settings);
server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running')
}


var packet = {
  topic: 'presence',
  payload: 'OnAlarm',
  qos: 1,
  retain: false,  
};

var packet2 = {
  topic: 'presence',
  payload: 'OffAlarm',
  qos: 1,
  retain: false,  
};

exports.setMessage = function(message){
	mensaje = message;
	console.log("Enviare" +message);
	if(mensaje == 'OnAlarm'){
		server.publish(packet, function() {
			console.log('Message sent 1' );  // it passes by here
			contMessage = 1;
		})	
	}else{
		server.publish(packet2, function() {
			console.log('Message sent 2' );  // it passes by here
			contMessage = 1;
		})	
	}
	contMessage = 0;
}


	

 
// fired when the mqtt server is ready
 
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