var GoogleLocation = require('google-locations');
var locations = new GoogleLocation('AIzaSyDmHFe1kBoiktyOR2G5esWjradGHQpaQFI');

var location = {

  locate: function(coordinates, cb){
    params = {
      latlng: [coordinates.lat, coordinates.long],
      language: 'en'
    };
    locations.reverseGeocode(params, function(err, response){
      if(err){
        return cb(err);
      }
      return cb(null, response);
    });
  }
}

module.exports = location;
