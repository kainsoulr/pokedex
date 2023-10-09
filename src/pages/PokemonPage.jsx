import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const PokemonPage = () => {
    const { getPokemonByID } = useContext(PokemonContext);

    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});

    const { id } = useParams();

    const fetchPokemon = async id => {
        const data = await getPokemonByID(id);
        setPokemon(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPokemon(id);
    }, []);

    return (
        <main className="pokemon-container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="pokemon-header">
                        <div className="pokemon-number">#{pokemon.id}</div>
                        <div className="pokemon-image">
                            <img
                                src={pokemon.sprites.other.dream_world.front_default}
                                alt={`Pokemon ${pokemon?.name}`}
                            />
                        </div>
                        <div className="pokemon-info">
                            <h1 className="pokemon-name">{pokemon.name}</h1>
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
                            <div className="pokemon-stats">
                                <div className="pokemon-stat">
                                    Altura: <span>{pokemon.height}</span>
                                </div>
                                <div className="pokemon-stat">
                                    Peso: <span>{pokemon.weight}KG</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pokemon-stats-container">
                        <h1>Estadísticas</h1>
                        <div className="pokemon-stats-list">
                            {pokemon.stats.map((stat, index) => (
                                <div className="pokemon-stat-item" key={index}>
                                    <span className="stat-name">{stat.stat.name}</span>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-value">{stat.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>

    );
};