const express = require("express");
const router = express.Router();

//routes
router.get("", (req, res) => {
  res.send("hello from node js");
});

module.exports = router;
