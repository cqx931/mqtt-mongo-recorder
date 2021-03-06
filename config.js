var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || 'dev';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '172.20.10.7';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;
config.mqtt.user      = process.env.MQTT_USER      || 'user'
config.mqtt.password  = process.env.MQTT_PASSWORD  || ''

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || 'locahost';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'db';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';
config.mongodb.user       = process.env.USER               || 'user'
config.mongodb.password   = process.env.PASSWORD           || ''

module.exports = config;
