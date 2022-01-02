import axios from 'axios';

// Para traer todos los personajes:
export function getCharacters() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/characters') // Ésta es la conexión del back y el front.
        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data
        }); 
    };
};

// Para la busqueda por nombre:
export function getByName(name) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/characters?name=${name}`);
            return dispatch({
                type: 'BY_NAME',
                payload: json.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

// Para la busqueda por ID:
export function getDetail(id) {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/characters/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};

// Para traer todas las ocupaciones:
export function getOccupations() {
    return async function(dispatch) {
        const json = await axios.get('localhost:3001/occupations')
        return dispatch({
            type: 'GET_OCCUPATIONS',
            payload: json.data
        });
    };
};

// Para la creacion de personajes:
export function postCharacter(payload) {
    return async function(dispatch) {
        const json = await axios.post('http://localhost:3001/character', payload)
        return {
            type: 'POST_CHARACTER',
            json
        }
    };
};

// Filtrar personajes por status:
export function filterByStatus(payload) {
    return {
        type: 'BY_STATUS',
        payload
    };
};

// Filtrar personajes por personajes Creados o Existentes:
export function filterByCreatedAt(payload) {
    return {
        type: 'BY_CREATED',
        payload
    };
};

// Filtrar de A-Z o Z-A:
export function filterByOrder(payload) {
    return {
        type: 'BY_ORDER',
        payload
    };
};