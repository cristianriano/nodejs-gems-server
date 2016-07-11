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
var reviewModel  = require('./models/reviewModel')(app, mongoose);
var gemModel  = require('./models/gemModel')(app, mongoose);
var GemCtrl = require('./controllers/gemController');

var router = express.Router();

/*
  Funcion ejectuada ANTES de procesar cualquier peticion
  Habilita CORS (Cross-Origin-Resource-Sharing), peticiones de otros dominios
*/
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  function afterResponse(){
    console.log("METHOD: "+request.method);
    console.log("URL"+request.url);
    console.log(request.headers);
    console.log(request.body);
    console.log("-------------------");
    console.log(response.headers);
    console.log(response.body);
  }
  /*
    Para hacer debugging se puede adjuntar una funcion para ejecutar al terminar la peticion ('finish') o cerrar la conexion ('close')
      response.on('finish', afterResponse);
  */
  next();
});

router.route('/gems')
  .get(GemCtrl.findAllGems)
  .post(GemCtrl.addGem);

router.route('/gems/:id')
  .get(GemCtrl.findById);

router.route('/gems/:id/reviews')
  .post(GemCtrl.addReview);

router.route('/').get(function(request, response){
  response.status(200);
  response.send("Hello World!");
})

app.use(router);

// Start server
app.listen(8888, function() {
  console.log("Node server running on http://localhost:8888");
});
