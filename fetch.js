(function (window , document) {
    'use strict '


/*==========================Project=============================*/

const $form = document.querySelector('[data-js="form"]');
const $inputName = document.querySelector('[data-js="name"]');
const $respostPokemon = document.querySelector('[data-js="content"]');
const $typePokemon = document.querySelector('[data-js="type-content"]');
const $imgPokemon = document.querySelector('[data-js="imgPoke"]');

 $form.addEventListener('submit' , handleFormPokemon , true) 


 function handleFormPokemon (event) {
    event.preventDefault();
    startPoke()
    
    getMessageNotPokemon('error');
}

function startPoke() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${$inputName.value}`)
    .then(response => response.json())
    .then(data => {
        $respostPokemon.textContent = 'Nome: ' + upperCase(data.name);
        $typePokemon.textContent = 'Tipo: ' + upperCase(data.types[0].type.name);
        $imgPokemon.innerHTML =  "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
    })
    .catch(err => console.log('Erro Inesperado' + err))
}

function getMessageNotPokemon (typeError) {
    
    const message = {
        error: 'Pokémon não encontrado com esse nome :( ' , 
        
    }
    $respostPokemon.textContent = message[typeError]
}

function verificationMessagePoke () {
    const data = startPoke()
    if(!data) {

        getMessageNotPokemon('error');
    } else {
        
    }
}

function upperCase(firstWord){
    return firstWord[0].toUpperCase() + firstWord.substr(1)
}

}(window , document))






