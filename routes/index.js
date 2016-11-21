var express = require('express')
var fs = require('fs-extra')
var router = express.Router()

var nbVisits = 0

router.get('/', function(req, res){
    nbVisits++
    res.setHeader('Content-Type', 'text/html')
    res.render('./home/index', {
        title:'Bienvenue',
        message:'Accueil',
        visits: nbVisits
    })
})
        
.get('/chat', function(req, res){
    res.setHeader('Content-Type', 'text/html')
    res.render('./home/chat', {
        title:'Chat',
        message:'Chat',
        visits: nbVisits
    })
    
})

.post('/connexion', function(req, res){
    var u = req.body
    console.log(u)
    res.setHeader('Content-Type', 'text/html')
    res.send('ok')
    res.end()
})

module.exports = router