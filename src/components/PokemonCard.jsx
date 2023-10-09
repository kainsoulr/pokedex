import React from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ pokemon }) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
            <div className="pokemon-list-card">
                <img className="pokemon-list-image"
                    src={pokemon.sprites.other.dream_world.front_default}>
                </img>
                <p className="pokemon-list-number">Nº  {pokemon.game_indices[9].game_index}</p>
                <h2 className="pokemon-card-name">{pokemon.forms[0].name}</h2>
                <div className="pokemon-types-container">
                    {pokemon.types.map((typeData, index) => (
                        <p
                            key={index}
                            className={`pokemon-list-type ${typeData.type.name}`}
                        >
                            {typeData.type.name}
                        </p>
                    ))}
                </div>
            </div>
        </Link>
    )
}