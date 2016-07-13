// Variable con los datos que se pasan al template de Jade
var data = {
  title: "Crafted Gems Store",
  projectName: "Crafted Gems"
};

// GET - Pagina raiz, de inicio
exports.renderRoot = function(req, res){
  console.log('GET /');

  res.status(200);
  res.render('index', data);
};

// GET - Pagina para registrarse
exports.renderRegister = function(req, res){
  console.log('GET /register');

  res.status(200);
  res.render('register', data);
};
