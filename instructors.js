const fs = require('fs')
const data = require('./data.json')

//create

exports.post = function(req, res) {
    //req.body
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Preencha todos os campos`)
        }
    }
    req.body.birth = Date.parse(req.body.birth)
    req.body.create_at = Date.now()

    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file err')

        return res.redirect("/instructors")
    })

}

//update



//delte