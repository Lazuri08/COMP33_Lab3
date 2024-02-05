// importing Express and Mongoose, and Your Model

const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./restaurantModel"); // Adjust path as necessary
const app = express();
const port = 3000;

// connect to mangodb

const dataBConnection = "mongodb+srv://admin:admin@cluster0.u3eb0kz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dataBConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// define a route handler
// localhost:3000/restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

//filter by cusine
// localhost:3000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const { cuisine } = req.params;
    const restaurants = await Restaurant.find({ cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Sort by ID:
// Correct route for sorting by ID
// localhost:3000/restaurants/sort?sortBy=ASC
app.get('/restaurants/sort', async (req, res) => {
    const sortDirection = req.query.sortBy === 'DESC' ? '-restaurant_id' : 'restaurant_id';
    try {
      const restaurants = await Restaurant.find({})
        .sort(sortDirection)
        .select('cuisine name address.city restaurant_id -_id'); // Excludes id from selection
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Complex Filter
// localhost:3000/restaurants/Delicatessen
app.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisine: "Delicatessen",
      "address.city": { $ne: "Brooklyn" },
    })
      .select("cuisine name address.city -_id")
      .sort("name");
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
