require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db.js")
const bcrypt = require("bcrypt")
const path = require("path")
const fileUpload = require("express-fileupload")
const uuid = require("uuid")

const { Category, Product, ProductPhoto, User, Developer, GetMethod, PaymentMethod } = require("./src/models/models.js")

const router = require("./src/routes/index")
const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "src/static")))

app.use("/api", router)

const start = async () => {

    await db.authenticate()
    await db.sync()

    // Developer.create({
    //     developer_id:0,
    //     name:"ЭЛЕКТРОНИК"
    // })

    // Category.create({
    //     name: "Комплектующие",
    //     parent_id:1
    // })
    // Category.create({
    //     name: "Моноблоки",
    //     parent_id:1
    // })

    // Category.create({
    //     name: "Игровые пк",
    //     parent_id:1
    // })

    // SubCategory.create({
    //     category_id: 1,
    //     name: "сборки",
    // })
    // SubCategory.create({
    //     category_id: 1,
    //     name: "игровые"
    // })
    // SubCategory.create({
    //     category_id: 1,
    //     name: "офисные"
    // })

    // Product.create({
    //     descr: "test2",
    //     image_url: "test2",
    //     is_active: true,
    //     name: "test2",
    //     price: 3000,
    //     category_id: 3
    // })
    //   Product.create({
    //     descr: "test",
    //     image_url: "test",
    //     is_active: true,
    //     name: "test",
    //     price: 1000,
    //     category_id: 1
    // })
    //   Product.create({
    //     descr: "test3",
    //     image_url: "test3",
    //     is_active: true,
    //     name: "test",
    //     price: 6000,
    //     category_id: 1
    // })
    // ProductPhoto.create({
    //     name: "phoot",
    //     product_id: 1,
    //     url: "http://sewr.api/png"
    // })
    // ProductPhoto.create({
    //     name: "phoot2",
    //     product_id: 1,
    //     url: "http://sewr.api/png"
    // })
    // ProductPhoto.create({
    //     name: "phoot3",
    //     product_id: 1,
    //     url: "http://sewr.api/png"
    // })
    // ProductPhoto.create({
    //     name: "phoot3",
    //     product_id: 2,
    //     url: "http://sewr.api/png"
    // })

    // PaymentMethod.create({
    //     name:"Наличными"
    // })
    // PaymentMethod.create({
    //     name:"Банковской картой"
    // })

    // GetMethod.create({
    //     name:"Самовывоз"
    // })
    // GetMethod.create({
    //     name:"Доставка"
    // })

    const user = await User.findOne({
        where: {
            email: "admin123@yandex.ru",
        }
    })

    if (!user) {
        const hashedPassword = await bcrypt.hash("admin123@yandex.ru", 4)
        await User.create({
            email: "admin123@yandex.ru",
            name: "admin123@yandex.ru",
            password: hashedPassword,
            role: "admin",
        })
    }


    await app.listen(PORT, () => {
        console.log(`Server has been started on port http://localhost:${PORT}`);
    })
}

start()