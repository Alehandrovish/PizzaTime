const SHOPBAG = document.getElementById("shopbag");

function addFromDB (type)
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function (){   
        if(this.readyState ==4 && this.status ==200)
        {
            let blockList = document.getElementById(type).querySelector('.block__list');
            blockList.innerHTML = this.responseText;
            
        }
    };
    xmlhttp.open('GET', './database.php?searchType=\'' + type + '\'', false);
    xmlhttp.send();
}
 addFromDB ('pizza');
 addFromDB ('burger');
 addFromDB ('pita');


 function updateCart(){
    let cart;
    if (!localStorage.getItem("cart")){
        localStorage.setItem("cart", "[]");
    }
    let shopList = document.getElementById('shopList');
    cart = JSON.parse(localStorage.getItem("cart"));
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function (){   
        if(this.readyState ==4 && this.status ==200)
        {
            shopList.innerHTML = this.responseText;
        }
    };
    let ids = cart.map((obj) => {
        return obj.id;
      });
    
      let quantitys = cart.map((obj) => {
        return obj.quantity;
      });

      if (cart.length == 0)
      {
        shopList.innerHTML = null;
        if(SHOPBAG)
            SHOPBAG.classList.remove('_active');
        return;
      }



      ids = (JSON.stringify(ids)).slice(1, -1);
      quantitys = (JSON.stringify(quantitys)).slice(1, -1);

    xmlhttp.open('GET', './DBcart.php?searchID=' + ids, false);
    xmlhttp.send();
    let inputQuantitys = document.querySelectorAll('.chopbag__block__price__number__epta');
    for(let input of inputQuantitys)
    {
        let id = parseInt(input.closest('.chopbag__block').id);
        cart = JSON.parse(localStorage.getItem("cart"));
        let item = cart.find(element => element.id == id);
        if (item.quantity > 10)
        {
            item.quantity = 10;

        } else if (item.quantity < 1){
            item.quantity = 1;
        }
        input.innerHTML = item.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const REMOVE = document.querySelectorAll('.shopbag__block__delete');
     for(let i=0; i<REMOVE.length; i++){
        REMOVE[i].addEventListener('click', function(){
        removeFromCart(parseInt(REMOVE[i].parentElement.id));
})
}

function updateQuantity (input){
    let id = parseInt(input.closest('.chopbag__block').id);
    cart = JSON.parse(localStorage.getItem("cart"));
    let item = cart.find(element => element.id == id);
    item.quantity = parseInt(input.innerHTML);
    if (item.quantity > 10)
    {
        item.quantity = 10;

    } else if (item.quantity < 1){
        item.quantity = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}


    const MINUS = document.querySelectorAll('.minus')
    const PLUS = document.querySelectorAll('.plus');
    const number = document.querySelectorAll('.chopbag__block__price__number__epta');
    for (let i=0; i<MINUS.length; i++)
    {
        MINUS[i].addEventListener('click', function(){
            if (parseInt(number[i].textContent) > 1)
            {
                number[i].textContent=parseInt(number[i].textContent)-1;
                updateQuantity(number[i]);
                updatePrice();
            }
            
        })
        PLUS[i].addEventListener('click', function(){
            if (parseInt(number[i].textContent) < 10)
        {
            number[i].textContent=parseInt(number[i].textContent)+1;
            updateQuantity(number[i]);
            updatePrice();
        }
        })
    }
    updatePrice();
 }
 
 updateCart();



































const NAV_LEFT = document.querySelector('.navigation__left');

if(document.querySelector('.navigation__left')){
    NAV_LEFT.addEventListener('click', function(click){
        let nav_item = click.target;
        if(nav_item.textContent == '????????')
        {
            const element = document.getElementById("pizza");
            element.scrollIntoView({behavior: "smooth", block:"start"});
    
            console.log(element);
        }else if(nav_item.textContent == "??????????????")
        {
            const element = document.getElementById("burger");
            element.scrollIntoView({behavior: "smooth", block:"start"});
            console.log(element);
        }else if(nav_item.textContent == "????????")
        {
            const element = document.getElementById("pita");
            element.scrollIntoView({behavior: "smooth", block:"start"});
            console.log(element);
        }else if(nav_item.textContent == "??????????")
        {
            const element = document.getElementById("drinks");
            element.scrollIntoView({behavior: "smooth", block:"start"});
            console.log(element);
        }
        
    })
}


const ABOUT_BAR = document.querySelector('.onas');
const WINDOW = document.querySelector('.body');
if(document.querySelector('.onas')){
    ABOUT_BAR.addEventListener('click', function(e){
        e.stopPropagation();
        element = document.querySelector('.about');
        element.classList.toggle('_active');
    
        WINDOW.addEventListener('click', function(event){
            let everyWhere = event.target;
            element.classList.remove('_active');
        }, {once:true})
    })
}


const INSTA = document.getElementById("instagram");
if(document.getElementById("instagram")){
    INSTA.addEventListener('click', function(){
        location.href="https://www.instagram.com";
    })
    const FACEBOOK = document.getElementById("facebook")
    FACEBOOK.addEventListener('click', function(){
        location.href="https://www.facebook.com";
    })
}



const SHOPBAG_DIV = document.querySelector('.shopbag');
const SHOPBAG_EXIT = document.querySelector('.shopbag__title__img');
if(document.getElementById("shopbag")){
    SHOPBAG.addEventListener('click', function(){
        SHOPBAG_DIV.classList.add('_active');
        updatePrice();
    
    SHOPBAG_EXIT.addEventListener('click', function(){
        SHOPBAG_DIV.classList.remove('_active');
    })
})}




function updatePrice(){
    
    const TOTALPRICE = document.getElementById('totalPrice');
    const PRICENUMBER = document.querySelectorAll('.chopbag__block__price__number');
    const TOTALTOTALPRICE = document.getElementById('totalTotalPrice');
    let value = 0;

    for(const price of PRICENUMBER){
        value +=parseInt(price.closest('.chopbag__block__price').querySelector('.chopbag__block__price__number__epta').textContent)*parseInt(price.textContent.slice(0, 4));
        
    }
    TOTALPRICE.textContent = value +" ??????";
    TOTALTOTALPRICE.textContent = (parseInt(value)+50) +" ??????";
    let price = document.getElementById('totalTotalPrice').innerHTML;
      if (!localStorage.getItem("price"))
      {
        localStorage.setItem("price", 0);
      }
      localStorage.setItem("price", price);
} 

const MAKE_ORDER = document.querySelector('.chopbag__footer__button');
let windowe = window.location.toString();
if(document.querySelector('.chopbag__footer__button'))
{
    MAKE_ORDER.addEventListener('click', function(){
        if(parseInt(localStorage.getItem("price")) > 50)
        location.href = "./sites/shopbag.html";
    });
}

function addToCart(itemId){
  let cart = JSON.parse(localStorage.getItem('cart'));
  let item = {
    id:itemId,
    quantity:1
  };
  if (cart.length == 0){
    cart.push(item);
  } else {
    let res = cart.find(element => element.id == itemId);
    if (res === undefined){
        cart.push(item);
    } else {
        res.quantity += 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}
function removeFromCart(itemId){
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id != itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}


const BLOCK_PRICE = document.querySelectorAll('.block__price');
for(let i=0; i<BLOCK_PRICE.length; i++)
{
    BLOCK_PRICE[i].addEventListener('click', function(){
        SHOPBAG.classList.add('_active');
        addToCart(parseInt(BLOCK_PRICE[i].id));
    })
}




if (document.querySelector('.under__block'))
{const UNDER = document.querySelectorAll('.under__block');
let under_pizza = UNDER[0];
let under_burgs = UNDER[1];
under_pizza.addEventListener('click', function(){
    location.href = "./sites/pizza.html";
})
under_burgs.addEventListener('click', function(){
    location.href = "./sites/burgers.html";
})}


const DRINK = document.querySelectorAll('.block-drink');
for (let i = 0; i<DRINK.length; i++)
{
    DRINK[i].addEventListener('click', function(){
        location.href = "./sites/drinks.html";
    }) 
}

const BACK_BUTN = document.querySelector('.back__button');
BACK_BUTN.addEventListener('click', function(click){
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: "smooth"});
})

