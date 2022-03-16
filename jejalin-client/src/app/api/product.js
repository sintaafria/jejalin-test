import axios from "axios"
import { config } from "../../config"

export const getProduct = async params => {
    return await axios.get(`${config.api_host}/api/product`, {params})
}

export const getProductDetail = async id => {
    return await axios.get(`${config.api_host}/api/product/${id}`)
}