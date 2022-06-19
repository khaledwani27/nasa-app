const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favouritesSchema = new Schema({
    img: String,
    description: String,
    nasa_id: String,
    title: String
})

const Favourites = mongoose.model("favourites", favouritesSchema)
module.exports = Favourites