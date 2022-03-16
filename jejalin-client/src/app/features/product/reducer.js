import { ERROR_FETCHING_PRODUCT, NEXT_PAGE, PREV_PAGE, SET_CATEGORY, SET_KEYWORD, SET_PAGE, SET_TAGS, START_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, TOGGLE_TAG } from "./constants"

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
}

const initialState = {
    data: [],
    currentPage: 1,
    totalItems: -1,
    perPage: 10,
    keyword: '',
    category: '',
    status: statusList.idle
}

export default function productReducer(state= initialState, { type, payload }) {
    switch(type) {
        case START_FETCHING_PRODUCT:
            return {...state, status: statusList.process}
        case ERROR_FETCHING_PRODUCT:
            return {...state, status: statusList.error}
        case SUCCESS_FETCHING_PRODUCT:
            return {...state, status: statusList.success, data: payload.data, totalItems: payload.count}
        case SET_PAGE:
            return {...state, currentPage: payload.currentPage}
        case SET_KEYWORD:
            return {...state, keyword: payload.keyword}
        case SET_CATEGORY:
            return {...state, currentPage: 1, category: payload.category, keyword: ''}
        case NEXT_PAGE:
            return {...state, currentPage: state.currentPage + 1}
        case PREV_PAGE:
            return {...state, currentPage: state.currentPage - 1}
       default:
            return state
    }
}