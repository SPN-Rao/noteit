const userSignup = require("../services/signupService")
const bcrypt = require('bcrypt')

module.exports.getSignup = (req,res)=>{
    res.render("signup")
}

module.exports.postSignup=async (req,res)=>{
  let uname = req.body.username.trim()
  let pwd = req.body.password
  let name = req.body.userName.trim()

  if (!uname && !name && checkPassword(pwd))
  {
      res.status(400)
      res.send("Invalid Form Data")
  }

  console.log("obj",uname,pwd,name,process.env.SALT_ROUND)

  pwd = await bcrypt.hash(pwd,Number(process.env.SALT_ROUND))
    
  console.log("Here..... I am")
  userSignup(uname,pwd,name).then((obj)=>{
    console.log("Success")
    console.log(obj)

    req.session.isAuthenticated = true
    req.session.username = obj.username
    req.session.UName = obj.name
    res.redirect("/user/login")
  })
  .catch((err)=>{
    console.log(err)
  })
}

function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}