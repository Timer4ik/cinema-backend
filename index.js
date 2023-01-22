require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db.js")

const router = require("./src/routes/index")
const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use("/api", router)

const start = async () => {

    await db.authenticate()
    await db.sync()

    await app.listen(PORT, () => {
        console.log(`Server has been started on port http://localhost:${PORT}`);
    })
}

start()