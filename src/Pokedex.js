import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokedex.css';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(response => {
        const promises = response.data.results.map(pokemon => axios.get(pokemon.url));
        Promise.all(promises).then(results => {
          const pokemonData = results.map(result => result.data);
          setPokemons(pokemonData);
        });
      });
  }, []);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value.toLowerCase());
  }



  return (
    <div className="pokedex">
      <input
        type="text"
        placeholder="Search Pokémon"
        className="search-input"
        onChange={handleSearchChange} // We will define this function next
      />
      <div className="pokemon-grid">
        {pokemons.filter(pokemon => pokemon.name.includes(searchQuery)).map(pokemon => (
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
