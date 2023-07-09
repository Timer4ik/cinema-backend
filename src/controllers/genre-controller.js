const { Genre } = require("../models/models");
const BaseController = require("./base-controller");

class GenreController extends BaseController {
    Model = Genre
}

module.exports = new GenreController()