import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCharacters,
    filterByStatus,
    filterByCreatedAt,
    filterByOrder,
} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch(); // con useDispatch, despacho las acciones.
    const allCharacters = useSelector(state => state.characters); // Con useSelector, me traigo todo lo que éste dentro del estado characters.
    const [order, setOrder] = useState(''); // FilterbyOrder

    // Paginado:
    const [currentPage, setCurrentPage] = useState(1);
    // El estado inicial de la página actual, arranca en PAG 1.
    const [charactersPerPage, setCharactersPerPage] = useState(9);
    // Cantidad de personajes por página, muestra 9 personajes.
    const indexOfTheLastCharacter = currentPage * charactersPerPage;
    // Sobre la pagina actual multiplica la cantidad de personajes a mostrar (1 * 9 = 9).
    const indexOfTheFirstCharacter = indexOfTheLastCharacter - charactersPerPage;
    // El indice del ultimo personaje - la cantidad de personajes por pagina (9 - 9 = 0).
    const currentCharacters = allCharacters.slice(indexOfTheFirstCharacter, indexOfTheLastCharacter);
    // A todos los personajes, cortalo desde el indice del primer personaje hasta el indice del ultimo personaje.

    const paginate = (pageNumber) => { setCurrentPage(pageNumber); };
    // El paginate va a setear la pagina actual en la que estoy posicionado.

    useEffect(() => { // Con useEffect nos traemos del estado los personajes cuando el componente se monta:
        dispatch(getCharacters()); // Despachamos la acción.
    }, [dispatch]); // Para que no se genere un bucle infinito de llamados, le pasamos la dependencia.
    // Solo se va a montar siempre y cuando suceda el [dispatch].

    // Boton del Reload all characters:
    function handleClick(e) {
        e.preventDefault(); // Es preventivo, para que no se recargue la página.
        dispatch(getCharacters());
    };

    // Boton del filter by status:
    function handleFilterByStatus(e) {
        //e.preventDefault();
        dispatch(filterByStatus(e.target.value));
    };

    // Boton del Filter by CreatedAt:
    function handleCreated(e) {
        e.preventDefault();
        dispatch(filterByCreatedAt(e.target.value));
    };

    // Boton del Filter by Order:
    function handleOrder(e) {
        e.preventDefault();
        dispatch(filterByOrder(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    return (
        <div>
            <Link to='/character'>Create Character</Link>
            <h1> The Breaking Bad App </h1>
            <button onClick={e => { handleClick(e) }}>
                Reload all characters
            </button>
            <div>
                <select onChange={e => handleOrder(e)}>
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                </select>
                <select onChange={e => handleFilterByStatus(e)}>
                    <option value='All'>allCharacters</option>
                    <option value='Alive'>Alive</option>
                    <option value='Deceased'>Deceased</option>
                    <option value='Unknown'>Unknown</option>
                    <option value='Presumed dead'>Presumed dead</option>
                </select>
                <select onChange={e => handleCreated(e)}>
                    <option value='All'>allCharacters</option>
                    <option value='Created'>Created</option>
                    <option value='Existing'>Existing</option>
                </select>
                <Paginate
                    charactersPerPage={charactersPerPage}
                    allCharacters={allCharacters.length}
                    paginate={paginate}
                />
                <SearchBar />
            </div>
            {
                currentCharacters?.map((c) => {
                    return (
                        <fragment className='card'>
                            <Link to={'/home/' + c.id}>
                                <Card
                                    name={c.name}
                                    image={c.img ? c.img : c.image}
                                    nickname={c.nickname}
                                    key={c.id}
                                />
                            </Link>
                        </fragment>
                    );
                })
            };
        </div>
    );
};