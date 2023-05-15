import { Navigate  } from "react-router-dom"
import axios from "../helper/axios"
import { authConstants, userConstants } from "./constants"
export const login = (email,password,history) => {

    return async (dispatch) => {
       try{
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/api/signin', {
            email,password
        })
        console.log(res)
        if (res.status === 200) {
            const { token,user} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,user
                
                }
            })
            return <Navigate  to={`/`} />

        }
        else {
           
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.message }
                })
            
        }
    }
       catch (err){
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            })
       }
    }
}
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            });
        }
    }
}
export const signup = (email,password,fullName) => {

    return async (dispatch) => {
       try{
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/api/signup', {
            email,password,fullName
        })
        console.log(res)
        if (res.status === 201) {
            const { token,user} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,user
                
                }
            })
            return <Navigate  to={`/`} />

        }
        else {
           
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.message }
                })
            
        }
    }
       catch (err){
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            })
       }
    }
}
export const signout = () => {
    return async (dispatch) => {
      /* dispatch({ type: authConstants.LOGOUT_REQUEST }); */
      //localStorage.removeItem('user');
      //localStorage.removeItem('token');
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      dispatch({ type: userConstants.RESETINDEX });
      //const res = await axios.post(`/admin/signout`);
      // if(res.status === 200){
  
      // }else{
      //     dispatch({
      //         type: authConstants.LOGOUT_FAILURE,
      //         payload: { error: res.data.error }
      //     });
      // }
    };
  };