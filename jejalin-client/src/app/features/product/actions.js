import debounce from "debounce-promise";
import { getProduct } from "../../api/product";
import { ERROR_FETCHING_PRODUCT, NEXT_PAGE, PREV_PAGE, SET_CATEGORY, SET_KEYWORD, SET_PAGE, START_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT} from "./constants";

export const startFetchingProduct = () => ({
    type: START_FETCHING_PRODUCT,
})

export const errorFetchingProduct = () => ({
    type: ERROR_FETCHING_PRODUCT,
})

export const successFetchingProduct = (payload) => ({
    type: SUCCESS_FETCHING_PRODUCT,
    payload
})

let debouncedFetchProduct = debounce(getProduct, 1000)

export const fetchProduct = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingProduct());
        let perPage = getState().product.perPage || 9;
        let currentPage = getState().product.currentPage || 1;
        let keyword = getState().product.keyword || '';
        let category = getState().product.category || '';
        const params = {
            limit: perPage,
            skip: (currentPage * perPage) - perPage,
            q: keyword,
            category
        }

        try {
            let {data: {data, count}} = await debouncedFetchProduct(params);
            dispatch(successFetchingProduct({data, count}))
        } catch(err) {
            dispatch(errorFetchingProduct)
        }
    }
}

export const setPage = (number = 1) => ({
    type: SET_PAGE,
    payload: {
        currentPage: number
    }
});

export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: {
        keyword: keyword
    }
});

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: {
        category
    }
});

export const goToNextPage = () => ({
    type: NEXT_PAGE
})

export const goToPrevPage = () => ({
    type: PREV_PAGE
})