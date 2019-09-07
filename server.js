//guinea_pig is app, unicorn_response is response, walrus_request is request

const express = require('express');
const session = require('express-session');
const guniea_pig = express();

guniea_pig.set('view engine', 'ejs');
guniea_pig.set('views', __dirname + '/views');

const server = guniea_pig.listen(1337);
const io = require('socket.io')(server);

guniea_pig.use(express.static(__dirname + '/static'));
guniea_pig.use(express.urlencoded({extended: true}));

io.on('connection', function(socket) {

    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server'});
    socket.on('thankyou', function(data) {
        console.log(data.msg);
    });
    socket.on('posting_form', function(data) {
        var message_to_send_back = `<p>`;
        message_to_send_back += 'You emitted the following information to the server!'
        message_to_send_back += `Name: ${data.name}, Dojo Location: ${data.location}, `
        message_to_send_back += `Comment: ${data.comment}`
        message_to_send_back += `</p>`

        socket.emit('updated_message', {msg: message_to_send_back});

        var message2_to_send_back = '<p> Your lucky number is: ';
        var randomNumber = Math.floor(Math.random() * 1000);
        message2_to_send_back += randomNumber;
        message2_to_send_back += '</p>'

        socket.emit('random_number', {msg: message2_to_send_back});
        console.log(randomNumber);
    });
});

guniea_pig.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUnitialized: true,
    cookie: { MaxAge: 60000 }
}));

guniea_pig.get('/', (unicorn_request, walrus_response) => {
    walrus_response.render('index');
});

guniea_pig.post('/process_form', (unicorn_request, walrus_response) => {
    unicorn_request.session.results = unicorn_request.body;
    walrus_response.redirect('/results');
});

guniea_pig.get('/results', (unicorn_request, walrus_response) => {
    walrus_response.render('results', {results: unicorn_request.session.results});
});
