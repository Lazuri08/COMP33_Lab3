const mongoose = require('mongoose');

// defining schema
const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    address: {
      street: String,
      zipcode: String
    },
    ratings: [{
      date: Date,
      score: Number
    }]
  });

  // compile the model

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// export the model

module.exports = Restaurant;

