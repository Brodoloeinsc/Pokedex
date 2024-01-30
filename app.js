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
                            <p>`+val.nome+`</p>
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