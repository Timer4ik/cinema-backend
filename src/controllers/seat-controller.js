const { Seat } = require("../models/models")

class SeatController {

    async createSeat(req, res) {

        const { number,col,row,status } = req.body

        try {
            const newSeat = await Seat.create({
                number,col,row,status 
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
}

module.exports = new SeatController()