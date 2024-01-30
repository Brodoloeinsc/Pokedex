var quantidade = document.getElementById('quantidade')
quantidade.addEventListener('keyup',()=>{
    pegaPokemons(quantidade.value)
})

pegaPokemons(12)
function pegaPokemons(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allpokemon => {
        pokemon = [];

        allpokemon.results.map((val)=>{
            

            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemon.push({nome: val.name, imagem: pokemonSingle.sprites.front_default})

                if(pokemon.length == quantidade){
                    //Finalizamos nossas requisições

                    let poke_boxes = document.querySelector('.pokemon-boxes')
                    poke_boxes.innerHTML="";

                    pokemon.map((val)=>{
                        poke_boxes.innerHTML+=`
                            <div class="pokemon-box">
                            <img src="`+val.imagem+`">
                            <p onclick="abrir_popup('`+val.nome+`')">`+val.nome+`</p>
                            </div>
                        `
                        /*
                        <div class="pokemon-box">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png">
                        <p>Ditto</p>
                        </div>
                        */
                    })
                }

            })
        })

        pokemon.map((val)=>{
            console.log(val.nome)
        })
    })
}

var pop_up = document.getElementById('popup');
var popup_content = document.getElementById('content');
var classe = document.getElementsByClassName('pokemon-class');

pop_up.addEventListener('click', ()=>{
    fechar_popup();
})

function abrir_popup(name){
    pop_up.style.display = "block";
    popup_content.style.display = "block";

    fetch('https://pokeapi.co/api/v2/pokemon/'+name)
    .then(response => response.json())
    .then(data => {
        image = data.sprites.other.dream_world.front_default;
        popup_content.innerHTML += `<img src="`+image+`">`;
        popup_content.innerHTML += `<h3>`+data.name+`</h3>`;

        data.types.map((tipo)=>{
            nome = tipo.type.name
            achar_id = tipo.type.url

            console.log(achar_id);

            fetch(achar_id)
            .then(response => response.json())
            .then(result=>{
                popup_content.innerHTML += `<p class="cor`+result.id+`">`+result.name+`</p><br>`;
            })
        })
    })
}

function fechar_popup(){
    pop_up.style.display = "none";
    popup_content.style.display = "none";
    popup_content.innerHTML = "";
}