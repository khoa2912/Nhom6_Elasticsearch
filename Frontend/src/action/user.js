import { userConstants } from "./constants"
import axios from "../helper/axios"
export const getIndex = () => {
    return async (dispatch) => {
       try{
        dispatch({ type: userConstants.USER_GETINDEX_REQUEST })
        const res = await axios.get('/api/indexs')
        console.log(res)
        if (res.status === 200) {
            const data = res.data
            if(data.name!=="Error"){
                dispatch({
                    type: userConstants.USER_GETINDEX_SUCCESS,
                    payload: {
                        index:data
                    }
                })
            }

        }
        else {
           
                dispatch({
                    type: userConstants.USER_GETINDEX_FAILURE,
                    payload: { error: res.data.message }
                })
            
        }
    }
       catch (err){
            dispatch({
                type: userConstants.USER_GETINDEX_FAILURE,
                payload: { error: null }
            })
       }
    }
}
export const deleteIndex = (indexName) => {
    return async (dispatch) => {
       try{
        dispatch({ type: userConstants.USER_DELETEINDEX_REQUEST })
        const res = await axios.delete(`/api/${indexName}`)
        if (res.status === 204) {
            dispatch(getIndex())
        }
    }
       catch (err){
            dispatch({
                type: userConstants.USER_DELETEINDEX_FAILURE,
                payload: { error: null }
            })
       }
    }
}
/* export const nextPage = (scroll_id) => {
    return async (dispatch) => {
       try{
        dispatch({ type: userConstants.USER_DELETEINDEX_REQUEST })
        const res = await axios.delete(`/api/${indexName}`)
        if (res.status === 200) {
            dispatch(getIndex())
        }
    }
       catch (err){
            dispatch({
                type: userConstants.USER_DELETEINDEX_FAILURE,
                payload: { error: null }
            })
       }
    }
}
 */