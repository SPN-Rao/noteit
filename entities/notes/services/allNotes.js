const noteModel = require("../../../database/models/note")
module.exports = (username)=>{
    return noteModel.findOne({username: username})
}