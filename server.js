//guinea_pig is app, unicorn_response is response, walrus_request is request

const express = require('express');
const session = require('express-session');
const guniea_pig = express();

guniea_pig.set('view engine', 'ejs');
guniea_pig.set('views', __dirname + '/views');

guniea_pig.use(express.static(__dirname + '/static'));
guniea_pig.use(express.urlencoded({extended: true}));

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
    console.log(unicorn_request.body);
    unicorn_request.session.results = unicorn_request.body;
    walrus_response.redirect('/results');
});

guniea_pig.get('/results', (unicorn_request, walrus_response) => {
    walrus_response.render('results', {results: unicorn_request.session.results});
});

guniea_pig.listen(12345, () => console.log("I'm listening on port 12345"));