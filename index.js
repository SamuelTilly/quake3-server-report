const fs = require('fs');
const path = require('path');
const query = require('./src/query');
const stdin = require('./src/stdin');

const discord = require('./src/reporter/discord');
const stdout = require('./src/reporter/stdout');
const websocket = require('./src/reporter/websocket');

const config = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, 'config.json'), {encoding: 'utf8'}));

// Gather events from stdin
const serverEvents = stdin();

// Print events to terminal
stdout(serverEvents, console.log);

// Start websocket server
if (config.websocket) {
	websocket(serverEvents, config.websocket);
}

// Start discord client
if (config.discord && !config.debug) {
	discord(config.discord,
		query(config.server), serverEvents);
}
