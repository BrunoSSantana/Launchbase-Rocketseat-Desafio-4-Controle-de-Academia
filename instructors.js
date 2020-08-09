const fs = require('fs')
const teachers = require('./teachers.json')
const { age, graduation, dateUtc, dateTeacher } = require('./utils')

//create

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
    const id = Number(teachers.instructors.length + 1)
   
    
    teachers.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        grau_de_escolaridade,
        tipo_de_aula,
        area_de_atuacao,
        create_at,
    })

    fs.writeFile("teachers.json", JSON.stringify(teachers, null, 2), function(err) {
        if (err) return res.send('Write file err')

        return res.redirect("/instructors/teachers")
    })

}

//show

exports.show = (req, res) => {
    const {id} = req.params
    
    const foundInstructor = teachers.instructors.find(function(instructor){
        return instructor.id == id
    })
    
    if (!foundInstructor) {
        return res.send('Instrutor não encontrado')
    }


    const teacher = {
        ...foundInstructor,
        grau_de_escolaridade: graduation(foundInstructor.grau_de_escolaridade),
        age: age(foundInstructor.birth),
        area_de_atuacao: foundInstructor.area_de_atuacao.split(','),
        create_at: dateTeacher(foundInstructor.create_at)
    }

    return res.render('instructors/show', {teacher})
}

//edit

exports.edit = (req, res) => {
    const {id} = req.params

    const foundInstructor = teachers.instructors.find(function(instructor){
        return instructor.id == id
    })
    
    if (!foundInstructor) {
        return res.send('Instrutor não encontrado')
    }

    const teacher = {
        ...foundInstructor,
        birth: dateUtc(foundInstructor.birth)
    }

     return res.render('instructors/edit', {teacher})
}

//update

exports.update = (req, res) => {
    const {id} = req.body
    let index = 0

    const foundInstructor = teachers.instructors.find(function(instructor, foundIndex){
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })
    
    if (!foundInstructor) {
        return res.send('Instrutor não encontrado')
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth) //passando para timestamp
    }

    teachers.instructors[index] = instructor

    fs.writeFile("teachers.json", JSON.stringify(teachers, null, 2), function(err) {
        if (err) return res.send('Write file err')

    return res.redirect(`/instructors/${id}`)
    })
}

//delte

exports.delete = (req, res) => {
    const {id} = req.body

    const filterinstructors = teachers.instructors.filter(function(instructor){
        return instructor.id != id
    })

    teachers.instructors = filterinstructors

    fs.writeFile("teachers.json", JSON.stringify(teachers, null, 2), function(err){
        if(err) return res.send("Erro na execução do processo")

        return res.redirect("/instructors/teachers")
    })
}