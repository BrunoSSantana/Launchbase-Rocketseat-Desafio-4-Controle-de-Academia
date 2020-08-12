const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const students = require('./controllers/students')

routes.get('/', function(req, res) {
    return res.redirect('/instructors')
})

routes.get('/instructors', instructors.index)
routes.get("/instructors/create", instructors.create)
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit", instructors.edit)
routes.put("/instructors", instructors.update)
routes.delete("/instructors", instructors.delete)
routes.post("/instructors", instructors.post )

/*  */

routes.get('/students', students.index)
routes.get("/students/create", students.create)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit", students.edit)
routes.put("/students", students.update)
routes.delete("/students", students.delete)
routes.post("/students", students.post )

module.exports = routes