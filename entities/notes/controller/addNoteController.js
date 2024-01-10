const addNote = require("../services/addNote")
const crypto  = require("crypto")

const key = process.env.KEY

module.exports = (req,res)=>{
    console.log(req.body)

    if(req.body.noteitem===''){
        console.log(true)
        res.redirect(`/notes?err=${"Empty Note"}`)
        return
    }

    let encryptedItem = encryptNoteItem(JSON.stringify(req.body.noteitem),key)
    console.log(encryptedItem)
    addNote(req.session.username,encryptedItem).then((obj)=>{
        console.log("Add obj",obj)
        res.redirect("/notes")
    })
}


const encryptNoteItem = (text, key) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}