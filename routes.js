const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')
const teachers = require('./teachers.json')

routes.get('/', function(req, res) {
    return res.redirect('/instructors')
})

routes.get('/instructors', function(req, res) {
    return res.render('instructors/index')
})

routes.get("/instructors/create", function(req, res) {
    return res.render('instructors/create')
})

routes.get("/instructors/teachers", function(req, res){
    return res.render('instructors/teachers', {teachers})
})

routes.get("/instructors/:id", instructors.show)

routes.get("/instructors/:id/edit", function(req, res){
    return res.render('instructors/edit', {})
})
//pegando os dados do frontend

routes.post("/instructors", instructors.post )

routes.get('/members', function(req, res){
    return res.render('members')
})

module.exports = routes