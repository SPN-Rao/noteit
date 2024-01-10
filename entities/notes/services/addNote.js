const noteModel = require("../../../database/models/note")

module.exports = (username,noteItem)=>{
    return new Promise((resolve,reject)=>{
        noteModel.findOne({username : username})
        .then( existing =>{
            if (existing){
                existing.noteItem.push(noteItem)
                return existing.save()
            }
            else{
                return noteModel.create({ username:username, noteItem: [noteItem] });
            }
        })
        .then(obj=>{
            resolve(obj)
        })
        .catch(err=>{
            reject(err)
        })
    })
}