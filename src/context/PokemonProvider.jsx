import {  React, useEffect, useState } from "react";
import axios from 'axios';
import { PokemonContext } from "./PokemonContext";
import { useForm } from '../hook/useForm';

export const PokemonProvider = ({children}) => {

    const [allPokemons, setAllPokemons] = useState([]);
    const [globalPokemons, setGlobalPokemons] = useState([]);
    const [offset, setOffset] = useState(0)

    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    const [loading, setLoading] = useState(true)

    const getAllPokemons = async (limit = 20) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);
		setLoading(false);
	};

    const getGlobalPokemons = async () => {
        const baseURL = 'https://pokeapi.co/api/v2/';
        
        try {
            const response = await fetch(`${baseURL}pokemon?limit=1292&offset=0`);
            const data = await response.json();
            
            const promises = data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                return data;
            });
            
            const globalResults = await Promise.all(promises);
            
            setGlobalPokemons(globalResults);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching global pokemons:', error);
            setLoading(false);
        }
    };
    

    const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

    useEffect(() => {
		getAllPokemons();
	}, [offset]);

	useEffect(() => {
		getGlobalPokemons();
	}, []);

    const loadMorePokemons = () => {
        setOffset(offset+20)
    }

    return (
        <PokemonContext.Provider 
        value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonByID,
            loading,
            setLoading,
            loadMorePokemons
        }}>
            {children}
        </PokemonContext.Provider>

    );
};