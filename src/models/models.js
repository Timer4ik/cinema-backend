const db = require("../../db.js")
const { DataTypes, INTEGER } = require("sequelize")

const User = db.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.STRING(20), defaultValue: "user" }
}, {
    timestamps: true
})

const File = db.define("file", {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.INTEGER, defaultValue: 0 },
    name: { type: DataTypes.STRING, allowNull: true },
    link: { type: DataTypes.STRING },
})


const Genre = db.define("genre", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Film = db.define("film", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING, allowNull: true },
    photo_id: { type: DataTypes.INTEGER, allowNull: true },
    rating: { type: DataTypes.INTEGER, allowNull: true },
    genre_id: { type: DataTypes.INTEGER, allowNull: true },
    durationInHours: { type: DataTypes.FLOAT, allowNull: true },
    ageLimit: { type: DataTypes.INTEGER, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    platform: { type: DataTypes.STRING, allowNull: true },
    releasedAt: { type: DataTypes.DATE, allowNull: true }
})

File.hasMany(Film, { foreignKey: "file_id" })
Film.belongsTo(Film)

Genre.hasMany(Film, { foreignKey: "genre_id" })
Film.belongsTo(Genre)

const RentFilm = db.define("rent_film", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    start_active_dt: { type: DataTypes.DATE, allowNull: true },
    end_active_dt: { type: DataTypes.DATE, allowNull: true }
})

Film.hasMany(RentFilm, { foreignKey: "film_id" })
RentFilm.belongsTo(Genre)

const Session = db.define("session", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rent_film_id: { type: DataTypes.INTEGER },
    session_time: { type: DataTypes.STRING }
})

RentFilm.hasMany(Session, { foreignKey: "rent_film_id" })
Session.belongsTo(RentFilm)



const Enums = {
    "user": User,
    "users": User,
    "photo": File,
    "photos": File,
    "file": File,
    "files": File,
    "genre":Genre,
    "genres":Genre,
    "film":Film,
    "films":Film,
    "rent_film":RentFilm,
    "rent_films":RentFilm,
    "session":Session,
    "sessions":Session,
}

module.exports = {
    Enums,
    User,
    File,
    Genre,
    Film,
    RentFilm,
    Session
}


