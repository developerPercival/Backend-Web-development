const express = require("express");
const morgan = require("morgan");
const app = express();

// app.use(morgan("tiny"));

// MIDDLEWARE

//First
// app.use((req, res, next) => {
//   console.log("FIRST MIDDLEWARE!");
//   next();
// });

//Second
// app.use((req, res, next) => {
//   console.log("SECOND MIDDLEWARE!");
//   next();
// });

//Third
// app.use((req, res, next) => {
//   console.log("THIRD MIDDLEWARE!");
//   next();
// });

//Fourth
// app.use((req, res, next) => {
//   req.requesTtime = Date.now();
//   console.log(req.method.toUpperCase(), req.path);
//   next();
// });

//Dummy Password middlewarea
const verifyPassword = (req, res, next) => {
  const { password } = req.query;

  if (password === "saymyname") {
    next();
  }

  res.send("You dont have the correct password!");
};

//Route and Route handlers

app.get("/", (req, res) => {
  console.log(`Request time is ${req.requesTtime}`);
  res.send(`<h1>Home page</h1>`);
});

app.get("/dogs", (req, res) => {
  console.log(`Request time is ${req.requesTtime}`);
  res.send(`<h1>Wooof 🐺🐺🐺</h1>`);
});

app.get("/login", verifyPassword, (req, res) => {
  res.send(`<p>Your password is <b>${req.query.password}</b></p>`);
});

app.use((req, res) => {
  res.status(404).send(`<h1>404: Page not found!!! 😰😰</h1>`);
});

app.listen(3000, () => {
  console.log("Listening to port 3000!");
});
