import React, { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "../components/PokemonCard";


export const PokemonList = () => {

    const { allPokemons } = useContext(PokemonContext);

    return (
        <>
            <div className="card-list-pokemon container">
                {allPokemons.map(pokemon => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id}/>
                ))}
            </div>
        </>
    )
}
