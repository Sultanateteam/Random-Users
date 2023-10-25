///// Selections

const submit = document.querySelector('.submit')
const reset = document.querySelector('.reset')
const mode = document.querySelector('.mode')
const body = document.querySelector('body')
const loader = document.querySelector('.css-loader')
const users = document.querySelector('.users')
const search = document.querySelector('#search')
const deleteElement = document.querySelector('.delete')

////////// Variables

let modes = localStorage.getItem('modes')
const API = 'https://randomuser.me/api/?results=9'

///// Mode

if(modes){
    mode.classList.toggle('fa-sun')
    mode.classList.toggle('fa-moon')
    body.classList.toggle('orange')
}

mode.addEventListener('click', () => {
    mode.classList.toggle('fa-sun')
    mode.classList.toggle('fa-moon')
    body.classList.toggle('orange')
    modes = modes ? '' : 'orange'
    localStorage.setItem('modes', modes)
})

////////  Buttons

submit.addEventListener('click', (e) => {
    e.preventDefault()
    reload()
    reset.style.display = 'flex'
})

reset.addEventListener('click', () => {
    users.innerHTML = ''
    reset.style.display = 'none'
})

///// Functions
function randomUsers(resourse){
    return new Promise((resolve, reject) => {
        const res = new XMLHttpRequest()

        res.addEventListener('readystatechange', () => {
            if(res.readyState < 4 ){
                loader.classList.remove('dNone')
            }
            if(res.readyState > 3 && res.status === 200){
                loader.classList.add('dNone')
                const data = JSON.parse(res.responseText)
                resolve(data.results)
            }else if(res.readyState === 4){
                loader.classList.add('dNone')
                reject(`${res.responseText} Error ${res.status}`)
            }
        })
        res.open('GET', resourse)
    })
}

const reload = () => {
    randomUsers(API)
    .then((data) => {
        updateUI(data)
    })
    .catch((error) => {
        console.log(error)
    })
}

document.addEventListener('DOMContentLoaded', reload)

function updateUI(data){
    users.innerHTML = ''
    data.forEach((element, index)=> {
        users.innerHTML += 
            `<li class="user">
                <span><img src="${element.picture.large}" alt="User photo"></span>
                <p class='user-name'><i class="fa-brands fa-servicestack"></i> - ${element.name.title} ${element.name.first} ${element.name.last}</p>
                <p><i class="fa-solid fa-cake-candles"></i> -${element.dob.age} years old</p>
                <p><i class="fa-solid fa-location-dot"></i> -${element.location.city}, ${element.location.country}</p>
                <p><i class="fa-solid ${element.gender === 'male' ? 'fa-person' : 'fa-person-dress'}"></i> -${element.gender}</p>
                <i class="fa-solid delete fa-trash" onclick='clicked(${index})'></i>
            </li>`
    })
}

search.addEventListener('input', (e) => {
    console.log(search.value.toLowerCase())
    const usersNames = document.querySelectorAll('.user-name')
    usersNames.forEach((e) => {
        if(!e.textContent.toLowerCase().includes(search.value)){
            e.parentElement.classList.add('dNone')
            console.log(e)
        }
        else{
            e.parentElement.classList.remove('dNone')
        }
    })
})

function clicked(ind){
    Array.from(users.children).forEach((e, i) => {
        if(i === ind){
            e.classList.add('dNone')
        }
    })
}