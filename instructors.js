const fs = require('fs')
const teachers = require('./teachers.json')
const { age } = require('./utils')

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
        age: age(foundInstructor.birth),
        area_de_atuacao: foundInstructor.area_de_atuacao.split(','),
        create_at: ""
    }

    return res.render('instructors/show', {teacher})
}

//update



//delte