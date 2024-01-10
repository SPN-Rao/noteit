const allNotes = require("../services/allNotes")
const crypto = require('crypto')

const key = process.env.KEY

module.exports = (req,res)=>{
    allNotes(req.session.username).then((obj)=>{
        console.log("Notes...",obj)

        let userNotes = []
        let errMsg = req.query.err || ""

        if(obj){
            userNotes = obj.noteItem
        }

        userNotes=userNotes.map(ele => JSON.parse(decryptNoteItem(ele,key)))

        res.render("home",{
            activeUser:req.session.username,
            definedControl: "Logout",
            userNotes: userNotes,
            err: errMsg
        })
    })

}

const decryptNoteItem = (encryptedText, key) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};