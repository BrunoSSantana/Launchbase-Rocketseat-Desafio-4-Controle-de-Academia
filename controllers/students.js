const fs = require('fs')
const data = require('../data.json')
const { age, dateUtc, graduation, dateTeacher } = require('../utils')

//create
exports.index = function(req, res) {
    return res.render('students/index', {students: data.students})
}

exports.create = function(req, res) {
    return res.render('students/create')
}

exports.post = function(req, res) {
    //req.body
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Preencha todos os campos`)
        }
    }

    let {avatar_url, name, birth, grau_de_escolaridade, tipo_de_aula, area_de_atuacao} = req.body

    birth = Date.parse(birth)
    const create_at = Date.now()
    const id = Number(data.students.length + 1)
   
    
    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        grau_de_escolaridade,
        tipo_de_aula,
        area_de_atuacao,
        create_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file err')

        return res.redirect("/students/index")
    })

}

//show

exports.show = (req, res) => {
    const {id} = req.params
    
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    
    if (!foundStudent) {
        return res.send('Instrutor não encontrado')
    }


    const teacher = {
        ...foundStudent,
        grau_de_escolaridade: graduation(foundStudent.grau_de_escolaridade),
        age: age(foundStudent.birth),
        area_de_atuacao: foundStudent.area_de_atuacao.split(','),
        create_at: dateTeacher(foundStudent.create_at)
    }

    return res.render('students/show', {teacher})
}

//edit

exports.edit = (req, res) => {
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    
    if (!foundStudent) {
        return res.send('Instrutor não encontrado')
    }

    const teacher = {
        ...foundStudent,
        birth: dateUtc(foundStudent.birth)
    }

     return res.render('students/edit', {teacher})
}

//update

exports.update = (req, res) => {
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })
    
    if (!foundStudent) {
        return res.send('Instrutor não encontrado')
    }

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth) //passando para timestamp
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file err')

    return res.redirect(`/students/${id}`)
    })
}

//delte

exports.delete = (req, res) => {
    const {id} = req.body

    const filterStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filterStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na execução do processo")

        return res.redirect("/students/index")
    })
}