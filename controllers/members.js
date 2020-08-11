const fs = require('fs')
const data = require('../data.json')
const { age, dateUtc, graduation, dateTeacher } = require('../utils')

//create
exports.index = function(req, res) {
    return res.render('members/index', {members: data.members})
}

exports.create = function(req, res) {
    return res.render('members/create')
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
    const id = Number(data.members.length + 1)
   
    
    data.members.push({
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

        return res.redirect("/members/index")
    })

}

//show

exports.show = (req, res) => {
    const {id} = req.params
    
    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    
    if (!foundMember) {
        return res.send('Instrutor não encontrado')
    }


    const teacher = {
        ...foundMember,
        grau_de_escolaridade: graduation(foundMember.grau_de_escolaridade),
        age: age(foundMember.birth),
        area_de_atuacao: foundMember.area_de_atuacao.split(','),
        create_at: dateTeacher(foundMember.create_at)
    }

    return res.render('members/show', {teacher})
}

//edit

exports.edit = (req, res) => {
    const {id} = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    
    if (!foundMember) {
        return res.send('Instrutor não encontrado')
    }

    const teacher = {
        ...foundMember,
        birth: dateUtc(foundMember.birth)
    }

     return res.render('members/edit', {teacher})
}

//update

exports.update = (req, res) => {
    const {id} = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })
    
    if (!foundMember) {
        return res.send('Instrutor não encontrado')
    }

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth) //passando para timestamp
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file err')

    return res.redirect(`/members/${id}`)
    })
}

//delte

exports.delete = (req, res) => {
    const {id} = req.body

    const filterMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filterMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na execução do processo")

        return res.redirect("/members/index")
    })
}