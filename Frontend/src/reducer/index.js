import authReducer from './auth'
import userReducer from './user'
import indexReducer from './index_elastic'
import { combineReducers } from 'redux'


const initState={
    token:null,
    user:{
        fullName:'',
        email:'',
    },
    authenticate:false,
    authenticating:false
}
const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    index:indexReducer,
})


export default rootReducer;