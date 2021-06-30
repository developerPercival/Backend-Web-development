import express from "express";
import path from "path";
import methodOverride from "method-override";
import { v4 as getId } from "uuid";
import AppError from "./AppError.js";

const __dirname = path.resolve();
const app = express();
const PORT = 3000;

//fake database
let comments = [
  {
    id: getId(),
    username: `Joshua__axe`,
    comment: `I'm looking forward to learn new web development technology!`,
  },
  {
    id: getId(),
    username: `noobmaster1996`,
    comment: `Watching movies in netflix is refreshing!`,
  },
  {
    id: getId(),
    username: `karen_1996`,
    comment: `Shopping makes me alive!`,
  },
  {
    id: getId(),
    username: `dren900`,
    comment: `Making your first million dollar today is super easy!`,
  },

  {
    id: getId(),
    username: `yoolo`,
    comment: `Send your child to Ivy League using these five steps strategy!`,
  },
];

//Parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(`_method`));

// template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Display all commments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

//Form page
app.get("/comments/new", (req, res) => {
  res.render("comments/new.ejs");
});

//Create new comment
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: getId(), username, comment });
  res.redirect("/comments");
});

//Show details of single comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;

  const comment = comments.find((element) => {
    return element.id === id;
  });

  res.render("comments/show", { id, comment });
});

//Update existing comment route
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;

  const newComment = req.body.comment;

  const searchComments = comments.find((element) => {
    return element.id === id;
  });

  searchComments.comment = newComment;

  res.redirect("/comments");
});

//Editing comment
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;

  const comment = comments.find((element) => {
    return element.id === id;
  });

  res.render("comments/edit", { id, comment });
});

//Deleting comment
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;

  comments = comments.filter((element) => {
    return element.id !== id;
  });

  res.redirect("/comments");
});

// Test ------------------------------------------------------ //

// app.get("/tacos", (req, res) => {
//   res.send("GET /tacos response!");
// });

// app.post("/tacos", (req, res) => {
//   // parsing request body
//   const { product, qty } = req.body;

//   // using request body property
//   res.send(`<h1>Ok, you order ${qty} of ${product} tacos!</h1>`);
// });

//Error handler middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;

  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`Running in port: ${PORT}`);
});
