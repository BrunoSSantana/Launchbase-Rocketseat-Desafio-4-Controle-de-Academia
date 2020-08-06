module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && (today.getDate - birthDate.getDate) <= 0 ) {
            return age -= 1
        }

        return age
    },
    graduation: function(graduation) {
        switch(graduation) {
            case 'esi':
                return 'Ensino Superior Incompleto'
            case 'esc':
                return 'Ensino Superior Completo'
            case 'm':
                return 'Mestrado'
            case 'd':
                return 'Doutorado'
        }
    }
}