import axios from "axios"

export const getProducts = async()=>{
    try {
        let res = await axios.get(`${process.env.REACT_APP_API_LINK}/products`)
        res = await res?.data
        return {issue:false, msg: res}
    } catch (error) {
        return {issue: true, msg: error.message}
    }
}