var app = require('express')();
var location = require('./location');

app.get('/locate', function(req, res){
  coordinates = {lat: req.query.lat, long: req.query.long};
  location.locate(coordinates, function(err, res){
    console.log(res);
  })
})

app.listen(3000);
console.log("Server up and running");
