import * as ActionTypes from './ActionTypes'


const initialState = {
    notesList: [],
    selectedId: '',
    selectedNote: '',
    user:''

}

export default (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.FECTCH_NOTES:
            return {
                ...state, notesList: action.payload.reverse()
            };

        case ActionTypes.SET_USER:
            return {
                ...state, user: action.payload
            };
        
        // case ActionTypes.REMOVE:
        //     return {
        //         ...state, selectedId: '', selectedNote: ''
        //     };
        // case ActionTypes.SELECT_INFO:
        //     return {
        //         ...state, selectedId: action.payload.id, selectedNote: action.payload.note
        //     };
            // case ActionTypes.INCREMENT:
                
            //         state = initialState
                

        default:
            return state;

    }
}