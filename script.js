(function (window , document) {
    'use strict '
//===========LIB=========================//
    
function DOM (elements) {
this.element = document.querySelectorAll(elements);
}

DOM.prototype.on = function on (typeEvent , callback) {
Array.prototype.forEach.call(this.element , function(element){
  element.addEventListener(typeEvent , callback , false);
})
}

DOM.prototype.off = function off (typeEvent , callback) {
Array.prototype.forEach.call(this.element , function(element){
  element.removeEventListener(typeEvent , callback , false);
})
}

DOM.prototype.get = function get () {
return this.element;
}

DOM.prototype.forEach = function forEach () {
return Array.prototype.forEach.apply(this.element , arguments)
}

DOM.prototype.map = function map() {
return Array.prototype.map.apply(this.element , arguments)
}

DOM.prototype.filter = function filter() {
return Array.prototype.filter.apply(this.element , arguments)
}

DOM.prototype.reduce = function reduce() {
return Array.prototype.reduce.appy(this.element , arguments)
}

DOM.prototype.reduceRigth = function reduceRight() {
return Array.prototype.reduceRight.apply(this.element , arguments)
}

DOM.prototype.every = function every () {
return Array.prototype.every.apply(this.element , arguments)
}

DOM.prototype.some = function some () {
return Array.prototype.some.apply(this.element , arguments)
}




DOM.isArray = function isArray (param) {
return Object.prototype.toString.call(param) === '[object Array]';
}

DOM.isObject = function isObject (param) {
return Object.prototype.toString.call(param) === '[object Object]';
}

DOM.isFunction = function isFunction (param) {
return Object.prototype.toString.call(param) === '[object Function]';
}

DOM.isNumber = function isNumber (param) {
return Object.prototype.toString.call(param) === '[object Number]';
}

DOM.isString = function isString (param) {
return Object.prototype.toString.call(param) === '[object String]';
}


DOM.isBoolean = function isBoolean (param) {
return Object.prototype.toString.call(param) === '[object Boolean]';
}

DOM.isNullOrUndefined = function isNullOrUndefined (param) {
return Object.prototype.toString.call(param) === '[object Null]'
|| Object.prototype.toString.call(param) === '[object Undefined]';

}


//===============PROJECT========================//



const $form = new DOM('[data-js="form"]');
const $inputName = new DOM ('[data-js="name"]');
const $respostPokemon = new DOM('[data-js="content"]');
const $typePokemon = new DOM ('[data-js="type-content"]');
const $imgPokemon = new DOM ('[data-js="imgPoke"]');


const ajax = new XMLHttpRequest();

$form.on('submit' , handleFormPokemon , true) 

function handleFormPokemon (event) {
    event.preventDefault();
    const url = getUrl();
    ajax.open('GET' , url)
    ajax.send()
    ajax.addEventListener('readystatechange' , handleStateChange);
    
}

function handleStateChange () {
    if(isRequestOk()) {
        fillFieldsPokemon()
    } else {
        getMessageNotPokemon('error')
        
    }
    fillFieldsPokemon()
           
    }

function isRequestOk () {
    return ajax.readyState === 4 && ajax.status === 200;
}

function getUrl () {
    return `https://pokeapi.co/api/v2/pokemon/${$inputName.get()[0].value}`
}

let html = ''
function fillFieldsPokemon () {
   
    const data = parseData()
    if(!data) {

        getMessageNotPokemon('error');
    } else {
        
    }
    $respostPokemon.get()[0].textContent = 'Nome: ' + upperCase(data.name);
    $typePokemon.get()[0].textContent = 'Tipo: ' + upperCase(data.types[0].type.name);

    $imgPokemon.get()[0].innerHTML =  "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
}

function getMessageNotPokemon (typeError) {
    
    const message = {
        error: 'Pokémon não encontrado com esse nome :( ' , 
        
    }
    $respostPokemon.get()[0].textContent = message[typeError]
}


function parseData () {
    try {
        html = JSON.parse(ajax.responseText); 
    }
    catch(error) {
        html = getMessageNotPokemon()
    }
        return html;
}

function upperCase(firstWord){
    return firstWord[0].toUpperCase() + firstWord.substr(1)
}

}(window , document ))





























