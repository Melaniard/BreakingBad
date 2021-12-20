const initialState = {
    characters: [],
    allCharacters: [],
    occupations: [],
    details: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CHARACTERS':
            return {
                ...state,
                characters: action.payload,
                allCharacters: action.payload
            }; // En mi state characters y allCharacters que en principio son un [] vacio, manda todo lo que te mande la action GET_CHARACTERS.
        case 'BY_NAME':
            return {
                ...state,
                characters: action.payload
            };
        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            };
        case 'BY_STATUS':
            const allCharacters = state.allCharacters;
            const statusFilter = action.payload === 'All' ? allCharacters
                : allCharacters.filter(i => i.status === action.payload);
            return {
                ...state,
                characters: statusFilter
            };
        case 'BY_CREATED':
            const createdFilter = action.payload === 'Created' ?
                state.allCharacters.filter(i => i.createdInDB)
                : state.allCharacters.filter(i => !i.createdInDB)
            return {
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : createdFilter
            };
        case 'BY_ORDER':
            const orderName = action.payload === 'Asc' ?
                state.characters.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.characters.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
            return {
                ...state,
                characters: orderName
            };
        case 'GET_OCCUPATIONS':
            return {
                ...state,
                occupations: action.payload
            };
        case 'POST_CHARACTER':
            return {
                ...state
            };
        default:
            return state;
    };
};

export default rootReducer;