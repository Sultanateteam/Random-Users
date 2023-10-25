///// Selections

const submit = document.querySelector('.submit')
const reset = document.querySelector('.reset')
const mode = document.querySelector('.mode')
const body = document.querySelector('body')
const loader = document.querySelector('.css-loader')
const users = document.querySelector('.users')
const search = document.querySelector('#search')

////////// Variables

let modes = localStorage.getItem('mode')
const API = 'https://randomuser.me/api/?results=9'
//////// Mode

mode.addEventListener('click', () => {
    modes = modes ? '' : 'orange'
    localStorage.setItem('mode', modes)
    body.classList.toggle('orange')
})

if(modes){
    body.classList.add('orange')
}

///// Functions
// function randomUsers(resourse){
//     return new Promise((resolve, reject) => {
//         const res = new XMLHttpRequest()
//         res.addEventListener('readystatechange', () => {
//             if(res.readyState < 4){
//                 loader.classList.remove('dNone')
//             }
//             if(res.status === 200 && res.readyState ===4 ){
//                 resolve(JSON.parse(res.responseText).results)
//                 loader.classList.add('dNone')
//             }else if( res.readyState ===4 ){
//                 reject(`${res.status} Error ${res.response}`)
//                 loader.classList.remove('dNone')
//             }
//         })
//         res.open("GET", resourse)
//         res.send()
//     })
// }

// function reload(){
//     randomUsers(API)
//         .then((data) => {
//             createUl(data)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }

const randomUsers = async (resourse) => {
    const result = await fetch(resourse)

    if(result.status !== 200 ){
        throw new Error('Page not found!!!')
    }
    const data = await result.json()
    return data
}

function reload(){
    randomUsers(API).then((data) => {
        createUl(data.results)
    }).catch((error) => {
        console.log(error.message)
    })
}

function createUl(data){
    users.innerHTML = ''
    data.forEach((element, index) => {
        users.innerHTML +=
        `<li class="user">
            <span><img src="${element.picture.large}" alt="User photo"></span>
            <p class='user-name'><i class="fa-brands fa-servicestack"></i> - ${element.name.title} ${element.name.first} ${element.name.last}</p>
            <p><i class="fa-solid fa-cake-candles"></i> -${element.dob.age} years old</p>
            <p><i class="fa-solid fa-location-dot"></i> -${element.location.city}, ${element.location.country}</p>
            <p><i class="fa-solid ${element.gender === 'male' ? 'fa-person' : 'fa-person-dress'}"></i> -${element.gender}</p>
            <i class="fa-solid delete fa-trash" onclick='clicked(${index})'></i>
        </li>` 
    });
}

reload()

/////  Buttons

submit.addEventListener('click', (e) => {
    e.preventDefault()
    reload()
    reset.classList.remove('dNone')
})

reset.addEventListener('click', () => {
    users.innerHTML = ''
    reset.classList.toggle('dNone')
})

function clicked(ind){
    console.log(ind)
    Array.from(users.children).forEach((element, index) => {
        if(index === ind){
            element.classList.add('dNone')
        }
    });
}

/////// Search

search.addEventListener('input', () => {
    const userName = document.querySelectorAll('.user-name')
    console.log(search.value)
    userName.forEach((e,i) => {
        if(!e.textContent.toLowerCase().includes(search.value)){
            e.parentElement.classList.add('dNone')
        }else{
            e.parentElement.classList.remove('dNone')
        }
    })

})