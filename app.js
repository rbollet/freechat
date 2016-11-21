var fs = require('fs-extra')
var ent = require('ent')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')

var app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
        .set('view engine', 'twig')

// uncomment after placing your favicon in /public
        .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
        .use(logger('dev'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({  extended: true }))
        .use(cookieParser())
/**
 * Attention, ceci indique le dossier public par défaut. Il faut donc copier le fichier /socket.io-client/socket.io.js
 */ 
        .use(express.static(path.join(__dirname, 'public')))

// routes
        .use('/', index)

// catch 404 and forward to error handler
        .use(function(req, res, next){
            var err = new Error('Not found')
            err.status = 404
            next(err)
        })

// error handler
        .use(function(err, req, res, next){
            res.locals.message = err.message
            res.locals.error = req.app.get('env') === 'development' ? err : {}
            res.status(err.status || 500)
            res.render('error')
        });
        
module.exports = app;


