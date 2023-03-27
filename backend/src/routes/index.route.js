const express = require("express");

const router = express.Router();
const item = require("./router");
const user = require("./userRouter");

router.use("/items", item);
router.use("/users", user);

module.exports = router;
