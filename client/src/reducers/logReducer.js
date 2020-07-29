import { 
    GET_LOGS,
    SET_LOADING, 
    LOGS_ERROR,
    ADD_LOG,
    UPDATE_LOG,
    DELETE_LOG,
    SET_CURRENT,
    CLEAR_CURRENT,
    SEARCH_LOGS,
    CLEAR_SEARCH
} from '../actions/types'
import { logDOM } from '@testing-library/react'
    
const initialState = {
    logs: null,
    filtered: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_LOGS: 
            return{
                ...state,
                logs: action.payload,
                loading: false,
            }
        case ADD_LOG:
            return{
                ...state,
                logs: [...state.logs, action.payload], //copy logs, add new log from payload to logs arr copy
                loading: false,
            }
        case DELETE_LOG:
            return{
                ...state,
                logs: state.logs.filter(log => log.id !== action.payload),
                loading: false,
            }
        case UPDATE_LOG: 
            return{
                ...state,
                logs: state.logs.map(log => 
                    log.id === action.payload.id ? action.payload : log)
            }
        case SEARCH_LOGS:
            const regex = new RegExp(`${action.payload}`, 'gi')  //global, case insensitive
            return{
                ...state,
                filtered: state.logs.filter(log => {
                   return log.tech.match(regex) || log._id.match(regex) || log.message.match(regex) || log.date.match(regex);
                }),
            }
        case CLEAR_SEARCH:
            return{
                ...state,
                filtered: null,
            }
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload,
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null,
            }
        case SET_LOADING:
            return{
                ...state,
                loading: true,
            }
        case LOGS_ERROR:
            console.error(action.payload)
            return{
                ...state,
                error: action.payload
            }
        default:
            return{
                ...state
            }
    }

}