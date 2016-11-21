// Connexion à socket.io
var socket = io.connect('http://localhost:3000');
var user = false;

//Quand on reçoit un message, on l'insère dans la page
socket.on('message', function (data) {
    // insereMessage(data.pseudo, data.message)
    console.log(data);
});

// On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
/*var pseudo = prompt('Quel est votre pseudo ?');
 
 if (pseudo != null) {
 pseudo = 'anonymous';
 }
 */

/**
 * Une nouvelle personne anynomous vient de se connecter au site
 **/
//socket.emit('nouveau_client', 'anonymous');

//document.title = pseudo + ' - ' + document.title;

// Quand on reçoit un message, on l'insère dans la page
/*socket.on('message', function (data) {
 insereMessage(data.pseudo, data.message)
 });*/


// Quand un nouveau client se connecte, on affiche l'information
/*socket.on('nouveau_client', function (pseudo) {
 $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
 });*/


$('#poke').click(function () {
    socket.emit('message', 'Salut serveur, ça va ?');

});

// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function (data) {
    //insereMessage(data.pseudo, data.message)
    console.log(data.message);
});

/*socket.on('redirect', function(destination) {
    window.location.href = destination;
});*/

socket.on('logged', function(data) {
    console.log(data);
    if(data.logged === true){
        console.log('logged');
        user = data;
        window.location = data.path;
    }else{
        console.log('not logged');
    }
});

$('form').submit(function (e) {
    e.preventDefault();
    var user = {
        username: $('#inputPseudo').val().trim()
    };
    
    if (user.username.length > 5) {
        socket.emit('login', user);
    } else {
        $('#msg').html('<p>You must choose a pseudo to chat !</p>');
    }
});


// Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
/*$('form').submit(function (e) {
 e.preventDefault();
 
 var pseudo = $('#inputPseudo').val();
 
 if (typeof pseudo !== 'undefined') {
 if (pseudo.length > 6) {
 console.log('pseudo : ' + pseudo);
 } else {
 //alert('You must choose a pseudo to chat !');
 $('#inputPseudo').val('').focus();
 $('#msg').addClass('bg-danger');
 $('#msg').html('You must choose a pseudo with 6 letters !');
 }
 } else {
 //alert('You must choose a pseudo to chat !');
 $('#inputPseudo').val('').focus();
 $('#msg').addClass('bg-danger');
 $('#msg').html('You must choose a pseudo to chat !');
 }
 
 socket.emit('message', message); // Transmet le message aux autres
 //insereMessage(pseudo, message); // Affiche le message aussi sur notre page
 insereMessage('moi', message); // Affiche le message aussi sur notre page
 $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
 return false; // Permet de bloquer l'envoi "classique" du formulaire
 });
 
 // Ajoute un message dans la page
 function insereMessage(pseudo, message) {
 $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
 }*/