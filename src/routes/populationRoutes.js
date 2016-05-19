'use strict';

var cors = require('cors'),
    express = require('express'),
    app = express(),
    populationRouter = express.Router(),
    configmongo = require('../config/configmongo.js'),
    MongoClient = require('mongodb').MongoClient;

console.log(configmongo.url);

var getPopulations = function ( ) {
    
    populationRouter.all('*', cors());
    
    populationRouter.route('/')
        .get(function (req, res) {
        //mongodb://username:password@localhost:27017/exampledatabase
            MongoClient.connect(configmongo.url, function (err, db) {
                if (err) {
                    console.log(err);
                } else {
                    
                    var collection = db.collection('populations');

                    collection.find({}, {fields: {_id: 0}}).toArray(function (err, results) {

                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                        res.send(results[0]);
                    });
                };

            });

        });
    

    return populationRouter;
        
};

module.exports = {
  getPopulations: getPopulations
};
                         
                         