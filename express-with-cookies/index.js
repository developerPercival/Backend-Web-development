const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysigned"));

//Responding with cookies
app.use("/home", (req, res) => {
  try {
    res.cookie("name", "Joshua Macanip");
    res.cookie("stateOfPage", "Light");
    res.cookie("pageMode", "dark");
    res.cookie("msg", `I'm happy to work with you!`);
    res.send(`<h1>Hello World and Check your cookies!</h1>`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/greet", (req, res) => {
  const { name, msg, pageMode } = req.cookies;
  res.send(` 
    <h1>${name}</h1> 
    <p>${msg}</p> 
    <hr>
    <p>Your website is in <b>${
      pageMode[0].toUpperCase() + pageMode.slice(1)
    }</b></p>
  `);
});

//Signed
app.get("/sign", (req, res) => {
  try {
    res.cookie("signature", "janJoshuaInalesMacanip", { signed: true });
    res.send(`<h1>Signed Cookies</h1>`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/unsign", (req, res) => {
  try {
    res.send(req.signedCookies);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Listening to port 3000.");
});
