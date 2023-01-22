const seatController = require("../controllers/seat-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const protectedMiddleware = require("../middlewares/protected-middleware")
const Router = require("express").Router
const router = Router()

router.post("/seat", protectedMiddleware, seatController.createSeat)
// router.post("/:film_id/rent-seat/:seat_id", authMiddleware, )

module.exports = router