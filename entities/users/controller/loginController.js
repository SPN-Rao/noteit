const userLogin = require("../services/loginService")
const bcrypt = require('bcrypt')

module.exports.postReq=async (req,res)=>{
  let username = req.body.username
  let password = req.body.password

  let user = await userLogin(username)

  if(!user){
    res.render("login",{
      err : "Invalid credentials"
    })

    return
  }

  let match  = await bcrypt.compare(password,user.password)

  if(!match){
    res.render("login",{err : "Invalid credentials"})
    return
  }
  req.session.isAuthenticated = true
  req.session.username = user.username
  req.session.UName = user.name
  res.redirect("/notes/")
  
}

module.exports.getReq = (req,res)=>{
  if(req.session.isAuthenticated)
  {
    res.redirect("/notes/")
  }
  else
  {
    res.render("login",{err : ""})
  }
}