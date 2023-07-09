const GenreController = require("../controllers/genre-controller")
const authMiddleware = require("../middlewares/auth-middleware")

const Router = require("express").Router

const router = Router()

router.get("/genres", GenreController.get)
router.get("/genres/:id", GenreController.getById)
router.post("/genres", GenreController.post)
router.put("/genres/:id", GenreController.put)
router.delete("/genres/:id", GenreController.delete)

module.exports = router