var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/gems', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
    throw err;
  }
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// Import controllers y models
var models  = require('./models/gemModel')(app, mongoose);
var GemCtrl = require('./controllers/gemController');

var router = express.Router();

/*
  Funcion ejectuada ANTES de procesar cualquier peticion
  Habilita CORS (Cross-Origin-Resource-Sharing), peticiones de otros dominios
*/
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/gems')
  .get(GemCtrl.findAllGems)
  .post(GemCtrl.addGem);

router.route('/gems/:id')
  .get(GemCtrl.findById);

router.route('/gems/:id/reviews')
  .post(GemCtrl.addReview);

app.use(router);

// Start server
app.listen(8888, function() {
  console.log("Node server running on http://localhost:8888");
});
