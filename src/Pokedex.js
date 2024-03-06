import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokedex() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => {
                setPokemons(response.data.results);
            });
    }, []);

    return (
        <div className="pokedex">
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Pokedex;
