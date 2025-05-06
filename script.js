let select_dropdown = document.getElementById('options')
let LoadMoreButton = document.getElementById('LoadMoreButton')
let loadNum = 20

LoadMoreButton.addEventListener('click', () => {
    loadNum += 20
    let options = select_dropdown.value
    xhr.open('GET', `https://api.spoonacular.com/recipes/complexSearch?apiKey=56d7c84b97a944cdb367edc6050079dc&cuisine=${options}&number=${loadNum}`, true)
    xhr.send()
    xhr.onload = () => {
        let response = xhr.response
        let R1 = JSON.parse(response)
        let html = "";
        R1.results.forEach(element => {
            let title = element.title
            let image = element.image
            let id = element.id
            html += `
        <div class="card">
        <div class="img">
        <img src="${image}" alt="Food Image">
        </div>
        <div class="title">
            <h1>${title}</h1>
        </div>
        <button class="button type1"  id=${id} onclick='readMoreFunction(this.id)'>
        <span class="btn-txt">Recipe 🍀</span>
      </button>
    </div>`
        })
        let container = document.getElementById('container');
        container.innerHTML = html
    }
})

select_dropdown.addEventListener('change', () => {
    loadNum = 0
    let options = select_dropdown.value
    let container = document.getElementById('container')
    container.classList.add('slide')
    container.classList.remove('slideAgain')
    let spinner = document.getElementById('spinner').style.visibility = 'visible'
    xhr.open('GET', `https://api.spoonacular.com/recipes/complexSearch?apiKey=56d7c84b97a944cdb367edc6050079dc&cuisine=${options}&number=20`, true)
    xhr.send()
    xhr.onload = () => {
        let response = xhr.response
        let R1 = JSON.parse(response)
        let html = "";
        R1.results.forEach(element => {
            let title = element.title
            let image = element.image
            let id = element.id
            html += `
        <div class="card">
        <div class="img">
        <img src="${image}" alt="Food Image">
        </div>
        <div class="title">
            <h1>${title}</h1>
        </div>
        <button class="button type1"  id=${id} onclick='readMoreFunction(this.id)'>
        <span class="btn-txt">Recipe 🍀</span>
      </button>
    </div>`

            let container = document.getElementById('container');
            container.innerHTML = html
            let container1 = document.getElementById('container')
            container1.classList.remove('slide')
            container1.classList.add('slideAgain')
            let spinner = document.getElementById('spinner').style.visibility = 'hidden'
        });
    }
})

var xhr = new XMLHttpRequest();
xhr.open('GET', `https://api.spoonacular.com/recipes/complexSearch?apiKey=56d7c84b97a944cdb367edc6050079dc&cuisine=indian&number=20`, true)
xhr.send()
xhr.onload = () => {
    let response = xhr.response
    let R1 = JSON.parse(response)
    let html = "";
    R1.results.forEach(element => {
        let title = element.title
        let image = element.image
        let id = element.id
        html += `
        <div class="card">
        <div class="img">
        <img src="${image}" alt="Food Image">
        </div>
        <div class="title">
            <h1>${title}</h1>
        </div>
        <button class="button type1"  id=${id} onclick='readMoreFunction(this.id)'>
        <span class="btn-txt">Recipe 🍀</span>
      </button>
    </div>`

        let container = document.getElementById('container');
        container.innerHTML = html
    });
}

let readMoreFunction = (id) => {
    let backButton = document.getElementById('backButton')
    backButton.addEventListener('click', () => {
        let afterMenu = document.getElementById('afterMenu').style.display = 'none'
        let container = document.getElementById('container')
        container.classList.add('slideAgain')
        container.classList.remove('slide')

        xhr.open('GET', `https://api.spoonacular.com/recipes/complexSearch?apiKey=56d7c84b97a944cdb367edc6050079dc&cuisine=indian&number=20`, true)
        xhr.send()
        xhr.onload = () => {
            let response = xhr.response
            let R1 = JSON.parse(response)
            let html = "";
            R1.results.forEach(element => {
                let title = element.title
                let image = element.image
                let id = element.id
                html += `
        <div class="card">
        <div class="img">
        <img src="${image}" alt="Food Image">
        </div>
        <div class="title">
            <h1>${title}</h1>
        </div>
        <button class="button type1"  id=${id} onclick='readMoreFunction(this.id)'>
        <span class="btn-txt">Recipe 🍀</span>
      </button>
    </div>`

                let container = document.getElementById('container');
                container.innerHTML = html
            });
        }
    })
    let container = document.getElementById('container')
    let LoadMore = document.getElementById('LoadMoreButton').style.visibility = 'hidden'
    container.classList.add('slide')
    let spinner = document.getElementById('spinner').style.visibility = 'visible'
    xhr.open('GET', `https://api.spoonacular.com/recipes/${id}/summary?apiKey=56d7c84b97a944cdb367edc6050079dc`)
    xhr.send()
    let html = ""
    xhr.onload = () => {
        let check = document.getElementById('check').style.visibility = 'visible'
        backButton.style.visibility = 'visible'
        container.style.display = 'none'
        let res = xhr.response
        let parsedString = JSON.parse(res)
        let title = parsedString.title
        let summary = parsedString.summary
        html += `
        <div class="recipe">
        <h1 id="title">${title}</h1>
        <h1 id="summary">${summary}</h1>
    </div>`
        let body = document.getElementById('recipeInformation');
        body.innerHTML = html
        let spinner = document.getElementById('spinner').style.visibility = 'hidden'
        xhr.open("GET", `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=56d7c84b97a944cdb367edc6050079dc`)
        xhr.send()
        xhr.onload = () => {
            let response = xhr.response
            let parsedObj = JSON.parse(response)
            let html = ''
            let index = 0
            parsedObj.ingredients.forEach(element => {
                let elem = document.getElementById('checklist');
                html += `
                <input  value="1" name="r" type="checkbox" id=${index}>
                <label for=${index}>${element.name}</label>`
                elem.innerHTML = html
                index += 1
            });
        }
    }
}