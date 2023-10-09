import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";

export const Nav = () => {

	
	const { onInputChange, valueSearch, onResetForm } = useContext(PokemonContext)

	const navigate = useNavigate()

	const searchPokemons = (param) => {
		param.preventDefault()
		navigate('/search', {
			state: valueSearch
		});

		onResetForm();
	}

	return (
		<>
			<header className='container'>
				<Link to='/' className='logo'>
					<img
						src={`./pokedex-logo.png`}
						alt='Logo Pokedex'
					/>
				</Link>

				<form onSubmit={searchPokemons}>
					<div className='form-group'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-search'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>
						<input
							type='search'
							name='valueSearch'
							id=''
							value={valueSearch}
							onChange={onInputChange}
							placeholder='Nombre de pokémon...'
						/>
					</div>

					<button className='btn-search'>
						⌕
					</button>
				</form>
			</header>

			<Outlet />

			<footer className="footer">
				<div className="container">
					<p>
					<span className="red-text">Pokédex</span> © ALL RIGHTS RESERVED.
					</p>
				</div>
			</footer>
		</>
	)
}