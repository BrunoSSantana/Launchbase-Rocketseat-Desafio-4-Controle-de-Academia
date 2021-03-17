
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

        return
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    update(req, res) {
        return

    },
    delete(req, res) {
        return
    }
}