// const controller1 = require("../controller/")
const express = require('express')
const addNoteController = require('../controller/addNoteController')
const allNotesController = require('../controller/allNotesController')
const router  = express.Router()

router.route("/").get(allNotesController)

router.route("/add-note").post(addNoteController)

module.exports = router