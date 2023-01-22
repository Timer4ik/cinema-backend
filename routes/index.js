const express = require("express");

const Router = express.Router

const router = Router()

router.get("/films", (req, res) => {
    return res.json("yea")
})

module.exports = router