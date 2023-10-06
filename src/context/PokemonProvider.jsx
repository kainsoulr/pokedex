import axios from 'axios';
import { useState } from "react";
import { React, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({children}) => {

    const [Pokemons, setPokemons] = useState([])
    const [allPokemons, setAllPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    const getPokemons = async(limit= 20) => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const response = await axios.get(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = response.data

        const promises = data.results.map(async(pokemon) => {
            const response = await fetch(pokemon.url)
            const data = response.json()
            return data
        })

        const results = await Promise.all(promises)
    }

    const getAllPokemons = async() => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const response = await axios.get(`${baseURL}pokemon?=100000&offset=0`)
        const data = response.data

        const promises = data.results.map(async(pokemon) => {
            const response = await fetch(pokemon.url)
            const data = response.json()
            return data
        })

        const results = await Promise.all(promises)
    }

    useEffect(() => {
        getPokemons()
    }, []);

    useEffect(() => {
        getAllPokemons()
    }, []);


    return (
        <PokemonContext.Provider value={{
            numero:0
        }}>
            {children}
        </PokemonContext.Provider>

    );
};