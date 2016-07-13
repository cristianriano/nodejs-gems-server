var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

//-----------------------------------------------CONNECTION TO DB-------------------------------------------------------------
mongoose.connect('mongodb://localhost/gems', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
    throw err;
  }
  console.log('Connected to Database');
});


//-----------------------------------------------EXPRESS CONFIGURATION-------------------------------------------------------------
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// Habilitar folder public
app.use(express.static('public'));

// Indicar a Express el folder donde se encuentran los views de plantilla
app.set('views', './views');
// Especificar el motor de plantilla, en este caso Jade. Exiten (Pug, Mustache, EJS, Dust, etc)
app.set('view engine', 'jade');

/*
  Verifica el enviroment, si es development imprime el codigo html bonito, en varias lineas
  Para setear el enviroment en Windows:
    set NODE_ENV=production
*/
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

/*
  Habilitar el servicio de bootstrap con express

app.use(bootstrap.serve);
bootstrap.init({
  minified: true
});
*/

//----------------------------------------------IMPORT CONTROLLERS AND MODELS--------------------------------------------------------
var reviewModel  = require('./models/reviewModel');
var gemModel  = require('./models/gemModel');

var GemCtrl = require('./controllers/gemController');
var ctrl = require('./controllers/controller');


//---------------------------------------------------------ROUTES--------------------------------------------------------------------
var router = express.Router();

/*
  Funcion ejectuada ANTES de procesar cualquier peticion
  Habilita CORS (Cross-Origin-Resource-Sharing), peticiones de otros dominios
*/
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  /*
  function afterResponse(){
    console.log("METHOD: "+request.method);
    console.log("URL"+request.url);
    console.log(request.headers);
    console.log(request.body);
    console.log("-------------------");
    console.log(response.headers);
    console.log(response.body);
  }

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

router.route('/')
  .get(ctrl.renderRoot);

app.use(router);


//------------------------------------------------------------START SERVER------------------------------------------------------------
app.listen(8888, function() {
  console.log("Node server running on http://localhost:8888");
});
