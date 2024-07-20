const API__URL = "https://dummyjson.com"
const navbar = document.querySelector(".navbar__collection")
const skeleton = document.querySelector(".skeleton")
const wrapper = document.querySelector(".wrapper")
const semore = document.querySelector(".semore")
const collection = document.querySelector(".collection")
for(let i = 0; i < 12; i++){
    let skeletonItem = document.createElement("div")
    skeletonItem.classList.add("skeleton__item")
    skeletonItem.innerHTML = `
      <div class="skeletton__images skelete__inme"></div>
                    <div class="skeleton__line skelete__inme"></div>
                    <div class="skeleton__line skelete__inme"></div>
                    <div class="skeleton__line skelete__inme"></div>
    `
    skeleton.append(skeletonItem)
}
let perPageCount = 6
let offset = 1
async function fetchData(api, limit, category){
    let response = await fetch(`${api}/products${category}?limit=${limit}`)
    response
    .json()
    .then(res => createCard(res))
    .catch(err => console.log(err))
    .finally(()=>{
        skeleton.style.display = "none"
    })
}
fetchData(API__URL, perPageCount, "")

function createCard(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    console.log(data.products[0]);
    data.products.forEach((product)=>{
        let cardItem = document.createElement("div")
        cardItem.classList.add("card")
        cardItem.innerHTML =`
        <img src=${product.images[0]} alt="">
        <h3>${product.title}</h3>
        <p class= "desck" title ="${product.description}">${product.description}</p>
        <button>Buy now</button>
        `
       wrapper.appendChild(cardItem)

    })
}
semore.addEventListener("click", ()=>{
    offset++
    fetchData(API__URL, perPageCount*offset)
})
async function fetchCategory(api){
    let  response = await fetch(`${api}/products/category-list`)
    response
    .json()
    .then(res => createCategory(res))

}
fetchCategory(API__URL)

function createCategory(data){
    data.forEach((category)=>{
        let list = document.createElement("li")
        list.className ="item"
        list.innerHTML =`
        <data value="/category/${category}">${category}</data>
        `
        collection.appendChild(list)
    })
}
collection.addEventListener("click", (e)=>{
    if(e.target.tagName === "DATA"){
       let val = e.target.value
       fetchData(API__URL, perPageCount, val)
    }
})





























// console.log(navbar);
function toggleShow (){
    navbar.classList.toggle("show")
}
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})