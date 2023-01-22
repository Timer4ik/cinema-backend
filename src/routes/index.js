const Router = require("express").Router;
const authRouter = require("./auth-router.js")
const filmRouter = require("./film-router.js")
const seatRouter = require("./seat-router.js")

const router = Router()

router.use("/auth", authRouter)
router.use(filmRouter)
router.use(seatRouter)

module.exports = router