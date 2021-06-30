const express = require("express");
const app = express();
const session = require("express-session");

//Session options
const sessionOption = {
  secret: "thisismysecret",
  resave: false,
  saveUninitialized: false,
};

//Session middleware
app.use(session(sessionOption));

app.get("/shoppingcarts", (req, res) => {
  req.session.name = "Shopping Cart";

  if (req.session.items) {
    req.session.items += 1;
  } else {
    req.session.items = 1;
  }

  res.send(
    `YOU HAVE A CART NAMED: ${req.session.name.toUpperCase()} - ${
      req.session.items
    } ITEMS IN YOUR CART.`
  );
});

app.get("/login", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  const { username } = req.session;

  res.send(` 
    <h1>Welcome back ${username}</h1>
  `);
});

//Server
app.listen(3000, () => {
  console.log("Session server is running");
});
