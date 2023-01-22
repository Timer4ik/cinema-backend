const { Film } = require("../models/models")
const getOffset = require("../utils/getOffset")

class FilmController {

    async createFilm(req, res) {
        const {
            name,
            year,
            descr,
            status,
            price,
            image_url,
            rent_start_dt,
            rent_end_dt,
            session_times,
        } = req.body

        try {

            const newFilm = await Film.create({
                name,
                year,
                descr,
                status,
                price,
                image_url,
                rent_start_dt,
                rent_end_dt,
                session_times,
            })

            return res.json({ message: "Фильм был успешно добавлен", data: newFilm })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async getFilms(req, res) {

        const { page = 0, limit = 2 } = req.query

        const offset = getOffset(page, limit)

        try {
            const films = await Film.findAll({
                limit,
                offset
            })

            return res.json({ message: "Фильмы успешно получены", data: films })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
    async getFilmById(req, res) {

        const { id } = req.params

        try {
            const film = await Film.findOne({
                where: {
                    rent_film_id: id
                }
            })

            return res.json({ message: "Фильм получен", data: film })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

    async updateFilm(req, res) {
        const {
            name,
            year,
            descr,
            status,
            price,
            image_url,
            rent_start_dt,
            rent_end_dt,
            session_times,
        } = req.body

        const { id } = req.params

        try {

            const udpatedFilm = await Film.update({
                name,
                year,
                descr,
                status,
                price,
                image_url,
                rent_start_dt,
                rent_end_dt,
                session_times,
            }, {
                where: {
                    rent_film_id: id
                },
                returning: true
            })

            return res.json({ message: "Фильм был успешно обновлён", data: udpatedFilm[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }
}

module.exports = new FilmController()