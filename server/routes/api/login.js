const express = require('express')
const router = express.Router()
const dbConnect = require('../../utils/dbConnect.js')

module.exports = router

// Login

router.get('/', async (req, res) => {
  const db = await dbConnect()

  res.send(await db.login(req.query))
})
