require('dotenv').config();

const mongoose = require ("mongoose")

var mqtt     = require('mqtt');
var config   = require('./config');

const options = {
    clientId: "ash123", // can be any name
    username: config.mqtt.user,
    password: config.mqtt.passwrd,
    debug:true
}
var mqttUri  = 'mqtt://' + config.mqtt.hostname
var client   = mqtt.connect(mqttUri, options);

client.on('connect', function () {
    console.log("mqtt connected!");
    client.subscribe(config.mqtt.namespace);
});

client.on("error", function(error) { 
    console.log("Can't connect"+error);
})

const mongoUri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.hostname}/${config.mongodb.database}?retryWrites=true&w=majority`;

console.log('mongoUri', mongoUri)

var testSchema = new mongoose.Schema({
    name: String,
    value: String
  });
  
var TestModel = mongoose.model('message', testSchema);

mongoose.connect(mongoUri, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + mongoUri);
    }

    client.on('message',function(topic, message, packet){

        console.log("message is "+ message);
        console.log("topic is "+ topic);

        var newValue = new TestModel({
            name: topic,
            value: message
        })

        newValue.save(function (err) {
            if (err) return console.error(err);
            console.log('saved to database!')
        });
    });
})