const getFullInclude = require("../utils/getFullInclude");

class BaseController {

    async getById(req, res) {

        const { id } = req.params
        const { extend } = req.query

        try {
            console.log(this.Model);
            const include = getFullInclude(extend)
            const item = await this.Model.findByPk(id, {
                include
            })

            return res.json({
                message: "Элемент был успешно получен", data: item
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async get(req, res) {

        const { extend } = req.query

        try {
            const include = getFullInclude(extend)
            const where = data?.filter ?? {}
            const items = await this.Model.findAll({
                where,
                include
            })

            return res.json({
                message: "Данные успешно получены", data: items
            })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }
    }

    async post(req, res) {

        const data = req.body

        try {

            const modelData = await this.Model.create({
                ...data
            })

            return res.json({ message: "Данные успешно обновлены", data: modelData })

        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" ,error})
        }
    }

    async put(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const modelData = await this.Model.update({
                ...data
            }, {
                where: {
                    id: id
                },
                returning: true
            })
            return res.json({ message: "Данные были успешно обновлены", data: modelData[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }
    async delete(req, res) {

        const {
            ...data
        } = req.body

        const { id } = req.params

        try {

            const modelData = await this.Model.destroy({
                where: {
                    id: id
                },
                returning: true
            })
            return res.json({ message: "Данные были успешно обновлены", data: modelData[1][0].dataValues })
        } catch (error) {
            return res.status(400).json({ message: "Что то пошло не так" })
        }

    }

}

module.exports = BaseController