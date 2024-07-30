var express = require('express');
var router = express.Router();
var JWT = require('jwt-async');

// Trasa do uzyskania listy dostępnych algorytmów
router.get('/algorithms', function(req, res, next) {
    console.log(JWT.getSupportedAlgorithms());
    res.send('Lista algorytmów wyświetlona w konsoli');
});

// Trasa do kodowania nagłówka i ładunku do Base64
router.get('/header-payload', function(req, res, next) {
    var header = '{"typ":"JWT","alg":"HS256"}';
    var payload = '{"exp":"1489603440","name":"James Bond","admin":true,"userId": "b08f86af-35da-48f2-8fab-cef3904660bd"}';
    console.log(JWT.base64urlEncode(header));
    console.log(JWT.base64urlEncode(payload));
    res.send('Zakodowany nagłówek i ładunek wyświetlone w konsoli');
});

// Trasa do generowania tokenu JWT
router.get('/generate-jwt', function(req, res, next) {
    var header = '{"typ":"JWT","alg":"HS256"}';
    var payload = {"exp":"1489603440","name":"James Bond","admin":true,"userId": "b08f86af-35da-48f2-8fab-cef3904660bd"};
    var jwt = new JWT(); // tworzymy instancje jwt, domyślnie algorytm HS256
    jwt.setSecret('secret'); // ustawiamy sekret
    jwt.sign(payload, function (err, data) { // podpisujemy JWT
        if (err) console.log(err);
        console.log(data);
    });
    res.send('Cały token wyświetlony w konsoli');
});

// Trasa do weryfikowania tokenu JWT
router.get('/verify-jwt', function(req, res, next) {
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIxNDg5NjAzNDQwIiwibmFtZSI6IkphbWVzIEJvbmQiLCJhZG1pbiI6dHJ1ZSwidXNlcklkIjoiYjA4Zjg2YWYtMzVkYS00OGYyLThmYWItY2VmMzkwNDY2MGJkIn0.kOe-_IiGdBoBzsYFziQB45VAvbiK6ATZPkLUbHxJPqw';
    var jwt = new JWT(); // tworzymy instancje jwt, domyślnie algorytm HS256
    jwt.setSecret('secret'); // ustawiamy sekret
    jwt.verify(token, function (err, data) { // weryfikujemy JWT
        if (err) console.log(err);
        console.log(data); // zdekodowany i zweryfikowany JWT w konsoli
    });
    res.send('Zweryfikowany token wyświetlony w konsoli');
});

// Trasa do weryfikowania tokenu JWT z błędem
router.get('/verify-jwt-error', function(req, res, next) {
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIxNDg5NjAzNDQwIiwibmFtZSI6IkphbWVzIEJvbmQiLCJhZG1pbiI6dHJ2ZSwidXNlcklkIjoiYjA4Zjg2YWYtMzVkYS00OGYyLThmYWItY2VmMzkwNDY2MGJkIn0.kOe-_IiGdBoBzsYFziQB45VAvbiK6ATZPkLUbHxJPqw';
    var jwt = new JWT(); // tworzymy instancje jwt, domyślnie algorytm HS256
    jwt.setSecret('secret'); // ustawiamy sekret
    jwt.verify(token, function (err, data) { // weryfikujemy JWT
        if (err) console.log(err);
        console.log(data); // zdekodowany i zweryfikowany JWT w konsoli
    });
    res.send('Zweryfikowany token wyświetlony w konsoli');
});

module.exports = router;
