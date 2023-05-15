let diagram = document.querySelector('.diagram')
let item = document.querySelectorAll('.item')
let itemdelete = document.querySelectorAll('.fa-xmark')
let listtable = document.querySelector('.list__table')
let chart = document.querySelector('.chart')
let chartul = document.querySelector('.chart__ul')
let select = document.querySelector('#select')
let addBtn = document.querySelector('#addBtn')
let form = document.querySelector('.form')

let items = []

const CATEGORY = {
    'ФастФуд':'orange',
    'Спорт':'aqua',
    'Напитки':'pink',
    'Продукты':'green'
}

if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'))
}

items.forEach(item => {
    listtable.insertAdjacentHTML("beforeend",
        `<div class="item" id="${item.id}" style="border-left-color: ${CATEGORY[item.category]};">
            <div class="list__item">${item.product}</div>
            <div class="list__item">${item.category}</div>
            <div class="list__item">${item.price} ₽</div>
            <i style="cursor:pointer" class="fa-solid fa-xmark"></i>
        </div>`)
    createCategory(item)
});



listtable.addEventListener('click', e=>{
    if (e.target.classList.contains('fa-xmark')) {
      removeItem(e.target)

      writeLocal()
    } 
})

addBtn.addEventListener('click', e=>{
    e.preventDefault()
    if (form.inputname.value == '' || form.inputprice.value == '' || isNaN(Number(form.inputprice.value))) return

    createItem(form.inputname.value, form.select.value, form.inputprice.value)
})

function createItem(product, category, price) {
    let color
    let newItem = {
        id: Date.now(),
        product: product,
        category: category,
        price: price
    }

    for (key in CATEGORY) {
        if (key == category) color = CATEGORY[key]
    }

    listtable.innerHTML += `<div class="item" id="${newItem.id}" style="border-left-color: ${color};">
                                <div class="list__item">${product}</div>
                                <div class="list__item">${category}</div>
                                <div class="list__item">${price} ₽</div>
                                <i style="cursor:pointer" class="fa-solid fa-xmark"></i>
                            </div>`
    
    items.push(newItem)

    createCategory(newItem)

    writeLocal()

    form.inputname.value = ''
    form.inputprice.value = ''
    form.select.value = 'Продукты'
}

function createCategory(obj) {
    if (!chartul.children.length == 0) {
        let chartelems = document.getElementsByClassName('chart__elem')

        for (let i = 0; i < chartelems.length; i++) {
            if (chartelems[i].children[1].textContent == obj.category) {
                chartelems[i].children[2].innerHTML = parseFloat(chartelems[i].children[2].textContent.slice(0,-2)) + parseFloat(obj.price) + ' ₽'
                return
            }
        }
        defaultChartElem(obj)

    } else {
        defaultChartElem(obj)
    }
    // postDiagram(chartelems)
}

function postDiagram(chartelems) {
    let chartSummary = (e) => {
        let sum = 0
        for (let i = 0; i < e.length; i++) {
            sum += parseFloat(e[i].children[2].textContent.slice(0,-2))
        }
        return sum
    }

    let chartCategoryProportion = (j) => {
        let proportion
        
        let
    }

    const chartparameters = `chartSummary()`
    chart.style.background = `conic-gradient(${chartparameters})`
}

function writeLocal() {
    localStorage.setItem('items', JSON.stringify(items))
}

function writeLocalChart() {
    localStorage.setItem('chart', chart.style.background)
}

function removeItem(i) {
    i.closest('div').remove()
    
    const index = items.findIndex((item) =>{
        return item.id == i.closest('div').id
    })

    items.splice(index, 1)

    for (let j = 0; j < chartul.children.length; j++) {
        if (chartul.children[j].children[1].textContent == i.closest('div').children[1].textContent) {
            if (parseFloat(chartul.children[j].children[2].textContent.slice(0,-2)) - parseFloat(i.closest('div').children[2].textContent.slice(0,-2)) == 0) {
                chartul.children[j].remove()
            } else chartul.children[j].children[2].textContent = parseFloat(chartul.children[j].children[2].textContent.slice(0,-2)) - parseFloat(i.closest('div').children[2].textContent.slice(0,-2)) + ' ₽'
        }
    }
}

function defaultChartElem(obj) {
    return chartul.innerHTML += `<li class="chart__elem">
                <div class="elem__perc" style="background-color: ${CATEGORY[obj.category]};"></div>
                <p>${obj.category}</p>
                <div class="sum">${obj.price} ₽</div>
    </li>`
}