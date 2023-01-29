function addToBD(){
    let NAME = document.querySelector('._name').value;
    let MOBILE = document.querySelector('._tel').value;
    let CHECKBOX = document.querySelector('._checkbox').checked;
    let ADRES = document.querySelector('._street').value;
    let ADRES_DATA = document.querySelectorAll('.adress__data');
    let ADRES_STRING = ADRES + " " + ADRES_DATA[0].value + " " + ADRES_DATA[1].value + " " +ADRES_DATA[2].value;
    let MAGAZ_ADRES = document.querySelector('._your').value;
    let COMMENT = document.querySelector('.comments__textarea').value;
    let CART = JSON.stringify(JSON.parse(localStorage.getItem("cart"))).replace(/["]/g, '');
    let PRICE = JSON.stringify(localStorage.getItem("price")).replace(/["]/g, '');


    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function (){   
        if(this.readyState ==4 && this.status ==200)
        {
            localStorage.setItem("cart", "[]");
            localStorage.setItem("price", 0);
        }
    };
    if(CHECKBOX){
        xmlhttp.open('GET', "./DBorder.php?name=\"" + 
        NAME + "\"&mobile=\"" + MOBILE + "\"&checkbox=\"" + CHECKBOX + "\"&adres=\"" + 
        ADRES_STRING + "\"&comment=\"" + COMMENT + "\"&choise=\"" + CART + "\"&price=\"" + PRICE + "\"", false);        
    } else {
    xmlhttp.open('GET', "./DBorder.php?name=\"" + 
    NAME + "\"&mobile=\"" + MOBILE + "\"&checkbox=\"" + CHECKBOX + "\"&adres=\"" + 
    MAGAZ_ADRES + "\"&comment=\"" + COMMENT + "\"&choise=\"" + CART + "\"&price=\"" + PRICE + "\"", false);
    }
       xmlhttp.send();}

























const BACK_BUTN = document.querySelector('.back__button');
BACK_BUTN.addEventListener('click', function(click){
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: "smooth"});
})

const DELIVERY = document.getElementsByName('delivery');
const DELIVERY_TO_HOME_BLOCK = document.querySelector('.delivery-to-home');
const DELIVERY_YOURSELF_BLOCK = document.querySelector('.take-yourself');

for (let i=0; i<DELIVERY.length; i++)
{
    DELIVERY[i].addEventListener('change', radioBTN);
}

function radioBTN()
{
    if (DELIVERY[0].checked == true){
        DELIVERY_TO_HOME_BLOCK.classList.toggle('_active');
        DELIVERY_YOURSELF_BLOCK.classList.toggle('_active');
    }
    if (DELIVERY[0].checked == false)
    {
        DELIVERY_TO_HOME_BLOCK.classList.add('_active');
        DELIVERY_YOURSELF_BLOCK.classList.add('_active');
    }
    
}
const NUMBER_TELEFON = document.getElementsByName('mobile');
if(document.getElementsByName('mobile'))
{
    NUMBER_TELEFON[0].addEventListener('click', function(){
        NUMBER_TELEFON[0].value = "+380(";
    })
}


const FORM = document.getElementById('form');
let formReq = document.querySelectorAll('._req');
FORM.addEventListener('submit', formSend);

async function formSend(e){
    e.preventDefault();
    let error = formValidate(FORM);
    if (error == 0){
        console.log("OK");
        alert("Замовлення прийнято: йди до дупи");
        addToBD();
    } else{
        console.log(" not OK");
       
        //alert("Виділені поля мають бути заповнені");
        
       
    }
}

function formValidate(e){
    let error = 0;
    let CHECKBOX = document.querySelector('._checkbox').checked;
    let errorText = document.querySelector('.button__make-order');
    DestroyError();
    let formReq = document.querySelectorAll('._req');
    for (let i=0; i<formReq.length; i++){
        const input = formReq[i];
        formRemoveError (input);


        if (input.classList.contains('_name')){
            if (input.value.length != 0 && validationText(input.value) == 0)
            {   
                formRemoveError(input);
            }else{
                formAddError (input);
                error++;
            }
            
            //error++;
        } else if (input.classList.contains('_tel')){
            if (input.value.length != 0 && validationTel(input.value) == 0)
            {   
                validationTel (input.value);
                formRemoveError(input);
            }else{
                formAddError (input);
                error++;
            }

        } else if (CHECKBOX == true && input.classList.contains('_street')){
            if ( input.value != 0)
            { 
                formRemoveError(input);
            } else{
                formAddError (input);
                error++;
            }
    
        } else if (CHECKBOX == true && input.classList.contains('_street-data')){
            if (input.value.length != 0 && validationNum(input.value) == 0)
            { 
                validationNum(input.value);
                formRemoveError(input);
            } else{
                formAddError (input);
                error++;
            }

        } else if (CHECKBOX == false && input.classList.contains('_your')){
            if (input.value != 0)
            { 
                formRemoveError(input);
            } else{
                formAddError (input);
                error++;
            }
        } 

    }
    if (error != 0 ){
        CreateError(errorText, "Всі поля повинні бути заповненим");
    }
    return error;
}

function validationText (input){
    let index = 0;
    let len=input.length;
    let digits="йцукенгшщзхїєждлорпавіфячсмитьбюЙЦУКЕНГШЩЗХЇЄЖДЛОРПАВІФЯЧСМИТЬБЮ ";
    if (len > 50)
    {   
        CreateError(document.getElementById('name'), "Забагато символів (Введіть кількість симвовів  < 50)");
        index++;
    }
    for(i=0; i<10; i++)
    {if (digits.indexOf(input.charAt(i))<0)
    {CreateError(document.getElementById('name'), "Повинні бути букви Ураїнського алфавіту");
    index++;
    break}
    }
    return index;
   }

function validationTel (input)
    {
        let index = 0;
        let len=input.length;
        let digits="+(0123456789";
        if (len != 14)
        {
            CreateError(document.getElementById('tel'), "Неправильно введені дані ( Введіть 14 символів)");
            index++;
        }
        for(i=0; i<10; i++)
        {if (digits.indexOf(input.charAt(i))<0)
        {CreateError(document.getElementById('tel'), "У номері телефону повинні бути числа");
        index++;
        break}
        }
        return index;
       }
function validationNum (input){
        let index = 0;
        let len=input.length;
        let digits="0123456789";
        if (len > 3)
        {
            CreateError(document.getElementById('num'), "Забагато символів ( Введіть кількість символів < 3)");
            index++;
        }
        for(i=0; i<10; i++)
        {if (digits.indexOf(input.charAt(i))<0)
        {CreateError(document.getElementById('num'), "Неправильно введені дані (Повинні бути цифри)");
        index++;
        break}
        }
        return index;
       }



function CreateError(element, text){
    let span1 = document.createElement("p");
    span1.className='textError';
    span1.style.color = 'rgb(158, 0, 0)';
    span1.innerHTML = text;
    var parentDiv =element.parentNode;
    parentDiv.insertBefore(span1, element);
}
function DestroyError(){
        let span = document.querySelectorAll('.textError');
            for (let i=0; i<span.length; i++)
            {
                span[i].remove();
            } 
}
function formAddError (input){
    input.parentElement.classList.add('error');
    input.classList.add('_error');
}
function formRemoveError (input){
    input.parentElement.classList.remove('error');
    input.classList.remove('_error');
}