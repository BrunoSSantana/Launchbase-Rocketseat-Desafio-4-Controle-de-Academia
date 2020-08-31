
const { age, dateUtc, graduation, dateTeacher } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('instructors/index', {instructors: data.instructors})
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }

        let {avatar_url, name, birth, grau_de_escolaridade, tipo_de_aula, area_de_atuacao} = req.body

        birth = Date.parse(birth)
        const create_at = Date.now()
        const id = Number(data.instructors.length + 1)
    
        data.instructors.push({
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

            return res.redirect(`/instructors/${id}`)
        })
    },
    show(req, res) {
        const {id} = req.params
    
        const foundInstructor = data.instructors.find(function(instructor){
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
    },
    edit(req, res) {
        const {id} = req.params

        const foundInstructor = data.instructors.find(function(instructor){
            return instructor.id == id
        })
        
        if (!foundInstructor) {
            return res.send('Instrutor não encontrado')
        }

        const instructor = {
            ...foundInstructor,
            birth: dateUtc(foundInstructor.birth).iso
        }

        return res.render('instructors/edit', {instructor})
    },
    update(req, res) {
        const {id} = req.body
        let index = 0

        const foundInstructor = data.instructors.find(function(instructor, foundIndex){
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
            birth: Date.parse(req.body.birth), //passando para timestamp
            id: Number(req.body.id)
        }

        data.instructors[index] = instructor

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send('Write file err')

            return res.redirect(`/instructors/${id}`)}

        )},
    delete(req, res) {
        const {id} = req.body

        const filterinstructors = data.instructors.filter(function(instructor){
            return instructor.id != id
        })

        data.instructors = filterinstructors

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Erro na execução do processo")

            return res.redirect("/instructors/")
        })
    }
}