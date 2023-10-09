import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { useLocation } from "react-router-dom";
import { PokemonCard } from "../components";

export const SearchPage = () => {

    const location = useLocation()

    const {globalPokemons} = useContext(PokemonContext)
    
    const searchResult = globalPokemons.filter(pokemon => pokemon.name.includes(location.state))


    return (
        <div className="container">
            <p className="p-search">
                Resultados de búsqueda: <span>{searchResult.length}</span>
            </p>
            <div className='card-list-pokemon container'>
				{searchResult.map(pokemon => (
					<PokemonCard pokemon={pokemon} key={pokemon.id} />
				))}
			</div>
        </div>
    )
}