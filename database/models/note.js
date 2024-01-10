const { default: mongoose } = require("mongoose");

const noteSchema=new mongoose.Schema({
    username:String,
    noteItem: Array
})

const noteModel = mongoose.model('Notes',noteSchema)

module.exports = noteModel