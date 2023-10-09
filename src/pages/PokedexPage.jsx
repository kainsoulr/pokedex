import React, { useContext } from "react";
import { PokemonList } from "../components/PokemonList";
import { PokemonContext } from '../context/PokemonContext';

export const PokedexPage = () => {

    const {loadMorePokemons} = useContext(PokemonContext)

    return (
        <>
            <PokemonList/>
            <div className="container-btn-load-more container">
                    <button className='btn-load-more' onClick={loadMorePokemons}>
                        Más Pokémons
                    </button>
             </div>
        </>
    )
}