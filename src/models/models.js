const db = require("../../db.js")
const { DataTypes } = require("sequelize")

const Film = db.define("film", {
    rent_film_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    year: { type: DataTypes.STRING },
    descr: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    image_url: { type: DataTypes.STRING },
    rent_start_dt: { type: DataTypes.DATEONLY },
    rent_end_dt: { type: DataTypes.DATEONLY },
    session_times: { type: DataTypes.STRING }
})

const User = db.define("user", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.STRING(20), defaultValue: "user" }
})

const Seat = db.define("seat", {
    seat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    row: { type: DataTypes.INTEGER },
    col: { type: DataTypes.INTEGER },
})

const UserRentSeat = db.define("user_film", {
    user_rent_seat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    rent_film_id: { type: DataTypes.INTEGER },
    seat_id: { type: DataTypes.INTEGER }
})

Film.hasMany(UserRentSeat, { foreignKey: "rent_film_id" })

UserRentSeat.belongsTo(Film, { foreignKey: "rent_film_id" })

module.exports = {
    User,
    Seat,
    UserRentSeat,
    Film
}


