const { sortBank } = require("../controllers/bankController");
const express = require("express");
const router = express.Router();

router.get("/banks", sortBank);

module.exports = router;
