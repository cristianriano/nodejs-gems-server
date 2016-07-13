
// GET - Pagina raiz, de inicio
exports.renderRoot = function(req, res){
  console.log('GET /');

  // Variable con los datos que se pasan al template de Jade
  var data = {
    title: "Titulo",
    projectName: "Project name"
  };

  res.status(200);
  res.render('index', data);
};
