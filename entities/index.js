const userRoute = require("./users/routes")
const notesRoute = require("./notes/routes")
 
module.exports = (app)=>{
  app.use("/user",userRoute)
  app.use("/notes",notesRoute)
}