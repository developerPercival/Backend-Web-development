const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");
const app = express();
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "mysecretid", resave: false, saveUninitialized: true })
);

//Require login middleware
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }

  next();
};

app.get("/", (req, res) => {
  res.send("<h1>Homepage for this page.</h1>");
});

//Register form
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

//Register user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({
    username,
    password,
  });

  //Hashing is perform by mongoose middleware.

  //See your note for info.
  await user.save();

  res.redirect("/secret");
});

//Login form
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

//Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findAndValidate(username, password);

  if (foundUser) {
    req.session.user_id = foundUser._id;

    res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});

//Protected route with credintials
app.get("/secret", requireLogin, (req, res) => {
  res.render("secret.ejs");
});

//Logout user
app.get("/logout", (req, res) => {
  req.session.user_id = null;

  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server is running!");

  mongoose
    .connect("mongodb://localhost:27017/authDemo", {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to mongodb!");
    })
    .catch(() => {
      console.log("Failed to connect!");
    });
});
