#!/usr/bin/env node

/**
 * Module dependencies
 */

var app = require('../app')
var debug = require('debug')('myapp:server')
var http = require('http')

/**
 * Get port from env and store in Express
 * 
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP Server
 */

var server = http.createServer(app);

/**
 *  For Socket Io */
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    console.log('Une connexion vient de se produire.');
    //console.log(socket.id)

    // socket.emit('message', 'Bienvenue !');

    socket.on('message', function (message) {
        console.log('Un client veut me dire : ' + message);
        socket.emit('message', {message: 'oui ?'});
    });

    socket.on('login', function (login) {
        if (login.username.length > 5) {
            user = login;
        } else {
            user = false;
            user.username = 'anonymous';
        }

        //socket.emit('message', {message: 'Bienvenue ' + user.username });
        socket.emit('logged', { logged: true, message: 'Bienvenue ' + user.username, path: '/chat' });
    });


    socket.on('disconnect', function () {
        console.log('Un connexion vient de s\'interrompre !');
    });
});

/*
 io.sockets.on('connection', function (socket, pseudo) {
 console.log('pseudo 1 : ' + pseudo);
 if(pseudo === 'undefined'){ pseudo = 'anonymous'}
 // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
 socket.on('nouveau_client', function (pseudo) {
 console.log('pseudo 2 : ' + pseudo);
 if(pseudo === null){
 console.log();
 var pseudo = 'anonymous';
 }
 pseudo = ent.encode(pseudo);
 socket.pseudo = pseudo;
 socket.broadcast.emit('nouveau_client', pseudo);
 });
 
 // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
 socket.on('message', function (message) {
 message = ent.encode(message);
 socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
 });
 });
 */

server.listen(port)
        .on('error', onError)
        .on('listening', onListening);

/**
 * Normalize a port into a number, string or false
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
    debug('Listening on ' + bind);
}