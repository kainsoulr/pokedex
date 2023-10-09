import axios from 'axios';
import { useState } from "react";
import { React, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from '../hook/useForm';

export const PokemonProvider = ({children}) => {

    const [pokemons, setPokemons] = useState([])
    const [allPokemons, setAllPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

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

        setPokemons(...pokemons, ...results)
        setLoading(false)

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

        const results = await Promise.all(promises);

        setAllPokemons(results)
        setLoading(false)
    
    }

    const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

    useEffect(() => {
        getPokemons()
        
    }, []);

    useEffect(() => {
        getAllPokemons()
    }, []);


    return (
        <PokemonContext.Provider 
        value={{
            valueSearch,
            onInputChange,
            onResetForm,
            pokemons,
            allPokemons,
            getPokemonByID,
            loading,
            setLoading,
            active,
            setActive
        }}>
            {children}
        </PokemonContext.Provider>

    );
};