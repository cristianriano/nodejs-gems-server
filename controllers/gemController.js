var mongoose = require('mongoose');
// Almacena el modelo para serializar y deserealizar
var Gem  = mongoose.model('Gem');
var Review = mongoose.model('Review');

// Se exporta las funciones para ser usados como Dependency Injection
//GET - Return all Gems in the DB
exports.findAllGems = function(request, response) {
  Gem.find({}).sort({id: -1}).exec(function(err, gems) {
    if(err) return response.send(500, err.message);

    console.log('GET /gems');
    // La consulta fue exitosa, los retorna en formato json
    response.status(200).jsonp(gems);
  });
};

//GET - Return a Gem with specified ID
exports.findById = function(request, response) {
  console.log('GET /gems/'+request.params.id);
  Gem.findOne({ "id": request.params.id }, function(err, gem) {
    if(err) return response.send(500, err.message);

    response.status(200).jsonp(gem);
  });
};

//POST - Insert a new Gem in the DB
exports.addGem = function(request, response) {
  console.log('POST /gems');
  console.log(request.body);

  var gem = new Gem({
      id:    request.body.id,
      name:     request.body.name,
      description:  request.body.description,
      shine:   request.body.shine,
      price:  request.body.price,
      rarity:    request.body.rarity,
      color:    request.body.color,
      faces:    request.body.faces,
      images:    request.body.images,
      reviews:  []
  });

  gem.save(function(err, gem) {
    if(err) return response.status(500).send( err.message);
    response.status(200).jsonp(gem);
  });
};

//POST - Insert a new Review in the DB
exports.addReview = function(request, response) {
  console.log('POST /gems/'+request.params.id+'/reviews');
  console.log(request.body);

  Gem.findOne({ "id": request.params.id }, function(err, gem){
    var createTime;
    if(request.body.createdOn) createTime = request.body.createdOn;
    else createTime = Date.now;

    var review = new Review({
      stars: request.body.stars,
      body: request.body.body,
      author: request.body.author,
      createdOn: createTime
    });

    gem.reviews.push(review);
    gem.save(function(err, review){
      if(err) return response.status(500).send(err.message);
      response.status(200).jsonp(review);
    } );
  });
};
