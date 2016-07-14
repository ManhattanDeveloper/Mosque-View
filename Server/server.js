// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connecting to mongolab
var mongoose   = require('mongoose');
mongoose.connect('mongodb://mosque-view-user:mosque-view-password@ds015928.mlab.com:15928/mosque-prayer-times'); // connect to our database

//Pulling in the module
var Mosque     = require('./app/models/mosque-prayer-time');


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//NOT SURE WHY THE MIDDLEWARE IS HERE
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here




router.route('/mosque-prayer-time')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var mosque = new Mosque();      // create a new instance of the Bear model
        mosque.name = req.body.name;  // set the bears name (comes from the request)
        mosque.Fajr = req.body.Fajr;  // set the bears name (comes from the request)
        mosque.Dhuhr = req.body.Dhuhr;  // set the bears name (comes from the request)
        mosque.Asr = req.body.Asr;  // set the bears name (comes from the request)
        mosque.Maghrib = req.body.Maghrib;  // set the bears name (comes from the request)
        mosque.Isha = req.body.Isha;  // set the bears name (comes from the request)
        mosque.Jummah = req.body.Jummah;


        // save the bear and check for errors
        mosque.save(function(err) {
            if (err){
                res.send(err);
                console.log("-------Error-------")
                console.log(err);
            }
            console.log("New Mosque Time Added");
            res.json({ message: 'Mosque Added!' });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Mosque.find(function(err, mosques) {
            if (err)
                res.send(err);

            res.json(mosques);
        });
    });



router.route('/mosque-prayer-time/:mosque_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Mosque.findById(req.params.mosque_id, function(err, mosque) {
            if (err)
                res.send(err);
            res.json(mosque);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Mosque.findById(req.params.mosque_id, function(err, mosque) {

            if (err)
                res.send(err);

            mosque.name = req.body.name;  // set the bears name (comes from the request)
            mosque.Fajr = req.body.Fajr;  // set the bears name (comes from the request)
            mosque.Dhuhr = req.body.Dhuhr;  // set the bears name (comes from the request)
            mosque.Asr = req.body.Asr;  // set the bears name (comes from the request)
            mosque.Maghrib = req.body.Maghrib;  // set the bears name (comes from the request)
            mosque.Isha = req.body.Isha;  // set the bears name (comes from the request)
            mosque.Jummah = req.body.Jummah;

            // save the bear
            mosque.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Mosque updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Mosque.remove({
            _id: req.params.mosque_id
        }, function(err, mosque) {
            if (err)
                res.send(err);

            res.json({ message: 'Mosque successfully deleted' });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);