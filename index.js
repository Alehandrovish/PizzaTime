const NAV_LEFT = document.querySelector('.navigation__left');

NAV_LEFT.addEventListener('click', function(click){
    let nav_item = click.target;
    if(nav_item.textContent == 'Піци')
    {
        const element = document.getElementById("pizza");
        element.scrollIntoView({behavior: "smooth", block:"start"});
        console.log(element);
    }else if(nav_item.textContent == "Бургери")
    {
        const element = document.getElementById("burgers");
        element.scrollIntoView({behavior: "smooth", block:"start"});
        console.log(element);
    }else if(nav_item.textContent == "Піти")
    {
        const element = document.getElementById("pita");
        element.scrollIntoView({behavior: "smooth", block:"start"});
        console.log(element);
    }else if(nav_item.textContent == "Напої")
    {
        const element = document.getElementById("drinks");
        element.scrollIntoView({behavior: "smooth", block:"start"});
        console.log(element);
    }
    
})

const BACK_BUTN = document.querySelector('.back__button');
BACK_BUTN.addEventListener('click', function(click){
    console.log(BACK_BUTN);
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: "smooth"});
})

const ABOUT_BAR = document.querySelector('.onas');
const WINDOW = document.querySelector('.body');
ABOUT_BAR.addEventListener('click', function(e){
    e.stopPropagation();
    element = document.querySelector('.about');
    element.classList.toggle('_active');

    WINDOW.addEventListener('click', function(event){
        let everyWhere = event.target;
        element.classList.remove('_active');
    }, {once:true})
})

if (document.querySelector('.under__block'))
{const UNDER = document.querySelectorAll('.under__block');
let under_pizza = UNDER[0];
let under_burgs = UNDER[1];
console.log(UNDER);
under_pizza.addEventListener('click', function(){
    location.href = "./sites/pizza.html"
})
under_burgs.addEventListener('click', function(){
    location.href = "./sites/burgers.html"
})}



