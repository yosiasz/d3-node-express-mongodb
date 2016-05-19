'use strict';

var express = require('express');
var app = express();

var populationRouter = require('./src/routes/populationRoutes');

var port = process.env.PORT || 5000;


//used by express first
app.use(express.static('./public'));
app.use(express.static('./src'));
app.use(express.static('./sampledata'));



//templating engine
app.set('views', './src/views');      
app.set('view engine', 'ejs');


app.use('/population', populationRouter.getPopulations());

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Population Chart'
    });
});

app.get('/sample', function (req, res) {

    res.render('sample', {
        title: 'Population Chart using sample tsv file'
    });
})

app.listen(port, function () {
    console.log('running server on port ' + port) 
});
