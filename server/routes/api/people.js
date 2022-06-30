const express = require("express");
const router = express.Router();
const dbConnect = require("../../utils/dbConnect.js");

router.get("/", async (req, res) => {
  const db = await dbConnect();

  res.send(await db.loadPeople(req.query));
});

module.exports = router;
