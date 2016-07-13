
// GET - Pagina raiz, de inicio
exports.renderRoot = function(req, res){
  console.log('GET /');

  // Variable con los datos que se pasan al template de Jade
  var data = {
    title: "Crafted Gems Store",
    projectName: "Crafted Gems"
  };

  res.status(200);
  res.render('index', data);
};
