import {  userConstants } from "../action/constants";
const initState = {
  index: [],
  error:''
};
export default (state = initState, action) => {
    switch (action.type) {
      case userConstants.USER_GETINDEX_SUCCESS:
        state = {
          ...state,
         index:action.payload.index,
        };
        break;
        case userConstants.RESETINDEX:
          state = {
            ...initState
          };
          break;
      
    }
    return state;
}