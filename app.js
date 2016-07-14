var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    flash = require('express-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//-----------------------------------------------CONNECTION TO DB-------------------------------------------------------------
mongoose.connect('mongodb://localhost/gems', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
    throw err;
  }
  console.log('Connected to Database');
});


//-----------------------------------------------EXPRESS CONFIGURATION-------------------------------------------------------------
// Indicar a Express el folder donde se encuentran los views de plantilla
app.set('views', './views');
// Especificar el motor de plantilla, en este caso Jade. Exiten (Pug, Mustache, EJS, Dust, etc)
app.set('view engine', 'jade');

// Habilitar folder public
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
/*
  Configura el uso de sesiones con Express. Parametros
    secret:              REQUERIDO. Es el string requerido para "firmar" la  cookie ID de sesiones
    resave:              Fuerza a volver a grabar la sesion incluso si esta no fue alterada durante la peticion
    saveUninitialized:   Fuerza a grabar en la store las sesiones que no han sido iniciadas
    maxAge:              Tiempo en milisegundos antes de que se autodestruya la cookie, en este caso 1 dia (24 horas)
*/
app.use(require('express-session')({
  secret: 'example sign',
  resave: false,
  saveUninitialized: false,
  maxAge: 86400000
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
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

//----------------------------------------------IMPORT MODELS--------------------------------------------------------
var reviewModel  = require('./models/reviewModel');
var gemModel  = require('./models/gemModel');
var userModel = require('./models/userModel');

// Passport configuration
//passport.use(new LocalStrategy(Account.authenticate()));
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//---------------------------------------------------------ROUTES--------------------------------------------------------------------
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

var routes = require('./routes/index');
var gemRoutes = require('./routes/gems');
var userRoutes = require('./routes/users');

app.use('/', routes);
app.use('/gems', gemRoutes);
app.use('/users', userRoutes);

/* Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/


//------------------------------------------------------------START SERVER------------------------------------------------------------
app.listen(8888, function() {
  console.log("Node server running on http://localhost:8888");
});
