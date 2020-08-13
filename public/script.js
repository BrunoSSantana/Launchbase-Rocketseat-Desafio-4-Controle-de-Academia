/* const cards = document.querySelectorAll('.bootcamp')

const modalOverlay = document.querySelector('.modal-overlay')

const modal = document.querySelector('.modal')
const maximize = document.querySelector('.maximize')




for ( let card of cards) {
    card.addEventListener("click", function () {
        const bootcamp = card.getAttribute("id")
        window.location.href = `/conteudos/${bootcamp}`
        console.log("OPA")
    })
}
 */
/* document.querySelector('.close-modal').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modal.classList.remove('maximize')
})

maximize.addEventListener('click', function () {
    if (modal.classList.contains('maximize')) {
        modal.classList.remove('maximize')
    } else {
        modal.classList.add('maximize')
    }
}) */

//Active

const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')

    }
}


//= REDIRECT=\\
const cards = document.querySelectorAll('.teacher')
    
for (let card of cards) {
    card.addEventListener("click", function (){
        const teacher = card.getAttribute("id")
        window.location.href = `/instructors/${teacher}`
        console.log("opa")
    })
}
//= DELTE =\\
