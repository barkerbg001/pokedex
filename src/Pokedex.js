import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokedex.css';

function Pokedex() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
          .then(response => {
            const promises = response.data.results.map(pokemon => axios.get(pokemon.url));
            Promise.all(promises).then(results => {
              const pokemonData = results.map(result => result.data);
              setPokemons(pokemonData);
            });
          });
      }, []);
      

      return (
        <div className="pokedex">
          <div className="pokemon-grid">
            {pokemons.map(pokemon => (
              <div key={pokemon.id} className="pokemon-card">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Pokedex;
