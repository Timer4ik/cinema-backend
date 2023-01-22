const { Seat, UserRentSeat, Film } = require("../models/models")

class SeatController {

    async createSeat(req, res) {

        const { number, col, row, status } = req.body

        try {
            const newSeat = await Seat.create({
                number, col, row, status
            })
            await newSeat.save()

            return res.json({
                message: "Место было успешно создано",
                data: newSeat
            })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async reserveSeat(req, res) {

        const { user_id } = req.user
        const { seat_id, rent_film_id } = req.params
        try {

            const isExistSeat = await Seat.findOne({
                where: {
                    seat_id
                }
            })

            if (!isExistSeat) {
                return res.status(400).json({ message: "Такого места не существует" })
            }

            const isAlreadyRent = await UserRentSeat.findOne({
                where: {
                    seat_id, rent_film_id
                }
            })

            if (isAlreadyRent) {
                return res.status(400).json({ message: "Место уже забронировано" })
            }

            const userSeat = await UserRentSeat.create({
                seat_id, rent_film_id, user_id
            })

            await userSeat.save()

            return res.json({ message: "Место успешно забронировано", data: userSeat })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async unReseveSeat(req, res) {
        const { user_id } = req.user
        const { seat_id, rent_film_id } = req.params
        try {

            const userSeat = await UserRentSeat.destroy({
                where: {
                    seat_id, rent_film_id, user_id
                }
            })

            return res.json({ message: "Место успешно освобождено", data: userSeat })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getUserReserveSeats(req, res) {
        const { user_id } = req.user

        try {

            const rentFilms = await UserRentSeat.findAll({
                where: {
                    user_id
                },
                include: {
                    model: Film
                }
            })

            return res.json({ message: "Забронированные места пользователя успешно получены", data: rentFilms })

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getFilmReserveSeats(req, res) {

        const { rent_film_id } = req.params

        try {

            const rentFilms = await UserRentSeat.findAll({
                where: {
                    rent_film_id
                }
            })

            return res.json({ message: "Забронированные места успешно получены", data: rentFilms })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }
}

module.exports = new SeatController()