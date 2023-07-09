const Router = require("express").Router;
const authRouter = require("./auth-router.js")
const genreRouter = require("./genre-router.js")
// const productRouter = require("./product-router.js")
// const productPhotoRouter = require("./product-photo-router.js")
const fileRouter = require("./file-router.js")

const router = Router()

router.use("/auth", authRouter)
router.use(genreRouter)
router.use(fileRouter)

module.exports = router