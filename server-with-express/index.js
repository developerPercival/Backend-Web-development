import express from "express";
import path from "path";

//run express
const app = express();
const __dirname = path.resolve();

//Set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//Serving static file
app.use(express.static(path.join(__dirname, "public")));

// HTTP get with ejs
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/asset", (req, res) => {
  res.render("static.ejs");
});

app.get("/cat", (req, res) => {
  const cats = ["Molly", "Spotty", "Sherry", "Mocky", "Browny"];

  res.render("cat.ejs", { cats });
});

app.get("/random", (req, res) => {
  const number = Math.floor(Math.random() * 10) + 1;

  //Passing data to ejs
  res.render("random.ejs", { number });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;

  res.render("subreddit.ejs", { subreddit });
});

// Create server
app.listen(8000, () => {
  console.log("Running in port: 8000");
});
