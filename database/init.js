const mongoose = require('mongoose')

const uri = process.env.DB_URL

module.exports = ()=>{
  return mongoose.connect(uri)
}