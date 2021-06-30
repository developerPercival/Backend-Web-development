const mongoose = require("mongoose");

//Connect mongoose to mongodb
mongoose
  .connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED SUCCESSFULLY");
  })
  .catch((error) => {
    console.log(`Something went wrong. Error: ${error}`);
  });

//Creating schema
const movieSchema = mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

//Create Model
const Movie = mongoose.model("Movie", movieSchema);

//Create Instances of model
const AvengerEndgame = new Movie({
  title: "Avenger Endgame",
  year: 2019,
  score: 98,
  rating: "A+",
});

const YourName = new Movie({
  title: "Your Name",
  year: 2019,
  score: 95,
  rating: "A+",
});

const GodzillaVKong = new Movie({
  title: "Godzilla Vs. Kong",
  year: 2021,
  score: 92,
  rating: "A",
});

//Save instances to mongodb
// AvengerEndgame.save();
// YourName.save();
// GodzillaVKong.save();

//Querying in mongoose
Movie.findOne({ name: "Your Name" }).then((data) => {
  console.log(data);
});
