var mongoose = require('mongoose');

var airplaneSchema = mongoose.Schema({
  id: String,
  name: String,
  flight_time: String,
  seat: String,
  from_city: String,
  destination_city: String
});

module.exports = mongoose.model('Airplane', airplaneSchema);
