const filmController = require("../controllers/film-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const protectedMiddleware = require("../middlewares/protected-middleware")

const Router = require("express").Router

const router = Router()

router.post("/film", protectedMiddleware, filmController.createFilm)
router.put("/film/:id", protectedMiddleware, filmController.updateFilm)
router.get("/film", filmController.getFilms)
router.get("/film/:id", filmController.getFilmById)

module.exports = router