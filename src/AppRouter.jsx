import React from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import { Nav } from './components/Nav';
import { PokedexPage, PokemonPage, SearchPage  } from './pages';

export const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<Nav></Nav>}>
            <Route index element={<PokedexPage/>}></Route>
            <Route path='pokemon/:id' element={<PokemonPage/>}></Route>
            <Route path='search' element={<SearchPage/>}></Route>
        </Route>
        <Route>
            <Route path='*' element={<Navigate to={'/'}/>}></Route>
        </Route>
    </Routes>
}