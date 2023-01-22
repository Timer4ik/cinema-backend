const seatController = require("../controllers/seat-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const protectedMiddleware = require("../middlewares/protected-middleware")
const Router = require("express").Router
const router = Router()

router.post("/seat", protectedMiddleware, seatController.createSeat)
router.post("/films/:rent_film_id/reserve-seats/:seat_id", authMiddleware, seatController.reserveSeat)
router.delete("/films/:rent_film_id/reserve-seats/:seat_id", authMiddleware, seatController.unReseveSeat)
router.get("/films/:rent_film_id/reserve-seats", authMiddleware, seatController.getFilmReserveSeats)
router.get("/user-films/reserve-seats", authMiddleware, seatController.getUserReserveSeats)

module.exports = router