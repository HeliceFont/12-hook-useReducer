
export const JuegoReducer = (state = [], action) => {
    switch (action.type) {
        case "crear":
            // payload guardar el nuevo dato
            return [...state, action.payload];
        case "borrar":
            return state.filter(juego => juego.id !== action.payload)
        case "editar":
            let indice = state.findIndex(juego => juego.id === action.payload.id);
            // let newState = [...state];
            state[indice] = action.payload
            return [...state];

        default:
            return state;
    }
}