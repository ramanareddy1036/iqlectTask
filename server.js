var express = require('express');
var app = express();
var request = require('request');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, resp) => {
    resp.write("<h1> Home Page </h1>");
});

// use res.render to load up an ejs view file

// index page 
app.get('/getData', (req, res) => {

    request.get({
        url: 'https://jobs.github.com/positions.json?description=python&location=new+york',
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (err, PythonRes) {
        firstResponse = JSON.parse(PythonRes.body);
        request.get({
            url: 'https://jobs.github.com/positions.json?description=java&location=new+york',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (err, javaRes) {
            secondResponse = JSON.parse(javaRes.body);
            var result = firstResponse.reduce(function (arr, v, i) {
                return arr.concat(v, secondResponse[i]);
            }, []);

            res.render('pages/index', { 'users': result });
        });

    });



    // res.render('pages/index');
});

app.listen(8000, function (err, data) {
    console.log('connected ...........');
});