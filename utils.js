module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        const age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && (today.getDate - birthDate.getDate) <= 0 ) {
            return age -= 1
        }

        return age
    },
    graduation: function(graduation) {
        switch(graduation) {
            case 'esi':
                return 'Ensino Superior Incompconsto'
            case 'esc':
                return 'Ensino Superior Compconsto'
            case 'm':
                return 'Mestrado'
            case 'd':
                return 'Doutorado'
        }
    },
    dateTeacher: function(timestamp) {
        data = new Date(timestamp)

        const dia = data.getDate().toString().padStart(2, "0")
        const mes = (data.getMonth()+1).toString().padStart(2, "0")
        const ano = data.getFullYear()
        
        return `${dia}/${mes}/${ano}`
    }
}