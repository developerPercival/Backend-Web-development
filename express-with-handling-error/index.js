const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/models.js");
const AppError = require("./AppError.js");
const methodOverride = require("method-override");
const app = express();

app.use(methodOverride("_method"));

const verifyPassword = (req, res, next) => {
  const { password } = req.query;

  if (password === "saymyname") {
    next();
  }

  throw new AppError(401, "You have the wrong password!");
};

app.get("/", (req, res) => {
  res.send("Working!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("Wooh, You know my password, Good job!");
});

app.get("/error", (req, res) => {
  throw new AppError(401, "undefined variable please check your code!");
});

app.get("/admin", (req, res) => {
  throw new AppError(401, "Your not allowed to enter here!");
});

app.get("/add", async (req, res) => {
  await Student.deleteMany({});

  const newStudent = Student({
    name: "Joshua Macanipt",
    age: 25,
    grade: "Law School",
  });

  const response = await newStudent.save();
  console.log(response);

  res.send("Student route is working!!");
});

app.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const student = await Student.findById({ id });

  res.send("error!");
});

app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// app.use((err, req, res, next) => {
//   console.log("***************************************");
//   console.log("*****************ERROR*****************");
//   console.log("***************************************");
//   next(err);
// });

app.use((err, req, res, next) => {
  const { status = 501, message = "Something went wrong" } = err;

  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Listening in port: 3000");

  mongoose
    .connect("mongodb://localhost:27017/student", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log(`Failed to connect to database! err: ${err}`);
    });
});
