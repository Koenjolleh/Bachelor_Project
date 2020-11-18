import { INITIAL_MAP } from '../action_types';
  
const initialState = {
    initialMap: {}
}

export default (state = initialState, action) => {
    const payload = action.payload

    switch (action.type) {
        case INITIAL_MAP:
            return {
                ...state,
                initialMap: payload
            }       
    
        default:
            return state
    }
}