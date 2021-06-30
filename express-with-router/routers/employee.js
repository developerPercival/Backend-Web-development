const express = require("express");
const router = express.Router();

//Middleware
router.use((req, res, next) => {
  if (req.query.adminPass === "saymyname") {
    next();
  } else {
    res.send({
      msg: "Your not allowed here!",
    });
  }
});

router.get("/employeed", (req, res) => {
  try {
    res.json({
      msg: `I'm employeed here!`,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/check", (req, res) => {
  try {
    res.json({
      msg: `Yes, I'm employeed here!`,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/salary", (req, res) => {
  try {
    res.json({
      msg: "You can withdraw your salary!",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
