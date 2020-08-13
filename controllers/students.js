const fs = require('fs')
const data = require('../data.json')
const { age, dateUtc, dateTeacher, education } = require('../utils')

exports.index = function(req, res) {
    return res.render('students/index', {students: data.students})
}

exports.create = function(req, res) {
    return res.render('students/create')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Preencha todos os students`)
        }
    }

    birth = Date.parse(req.body.birth)
    const create_at = Date.now()
    
    let id = 1
    const lastId = data.students[data.students.length - 1]
    if(lastId.id > 0) {
        id = Number(lastId.id + 1)
    }
    
    data.students.push({
        id,
        birth,
        create_at,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file err')

        return res.redirect("/students/")
    })

}

exports.show = function(req, res) {
    const {id} = req.params
    
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    
    if (!foundStudent) {
        return res.send('Student não encontrado')
    }

    const student = {
        ...foundStudent,
        ano_escolar: education(foundStudent.ano_escolar),
        age: age(foundStudent.birth),
        create_at: dateTeacher(foundStudent.create_at),
        birthday: dateUtc(foundStudent.birth).birthday
    }

    return res.render('students/show', {student})
}

exports.edit = function(req, res) {
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    
    if (!foundStudent) {
        return res.send('Student não encontrado')
    }

    const student = {
        ...foundStudent,
        birth: dateUtc(foundStudent.birth).iso
    }

     return res.render('students/edit', {student})
}

exports.update = function(req, res) {
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })
    
    if (!foundStudent) {
        return res.send('Student não encontrado')
    }

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth) //passando para timestamp
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file err')

    return res.redirect(`/students/${id}`)
    })
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filterStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filterStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na execução do processo")

        return res.redirect("/students")
    })
}